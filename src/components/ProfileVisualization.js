import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import D3ComponentTemplate from './D3ComponentTemplate.js';
import './ProfileVisualization.css';
import pvAPI from './ProfileVisualizationApi';
import dataClean from './dataCleaning.js';

const ProfileVisualization = (props) => {
  const [userGitHubData, setUserGitHubData] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [newUserNameToSearch, setNewUserNameToSearch] = useState('');
  const [dataForViz, setDataForViz] = useState([]);
  const [error, setError] = useState('');

  const loadUser = async () => {
    try {
      const userPromise = await pvAPI.fetchGitHubData(`https://api.github.com/users/${props.userNameToSearch}`);
        const userData = await userPromise.json();
        setUserGitHubData(userData)
      } catch (err) {
        setError(err)
      }
    }

  const fetchRepoContributor = async () => {
    const userName = userGitHubData.login;
    const filteredUserRepos = userRepos.filter(async repo => {
      try {
        const contributorsPromise = await pvAPI.fetchGitHubData(`${repo.contributors_url}`);
        const contributorsList = await contributorsPromise.json();
        const contributorNames = contributorsList.filter(person => person.login);
        return contributorNames.includes(userName);
      } catch(err) {
        setError(err)
      }
    })
    setUserRepos(filteredUserRepos);
  }

  const loadRepos = async () => {
    try {
      const userPromise = await pvAPI.fetchGitHubData(`https://api.github.com/users/${props.userNameToSearch}/repos`);
        const repoData = await userPromise.json();
        setFilteredUserRepos(repoData)
      } catch (err) {
        setError(err)
      }
  }

  useEffect(() => {
    loadUser();
    loadRepos();
  }, [])

  useEffect(() => {
    fetchRepoContributor();
  }, [userRepos])

  return (
    <main>
      <h1>{userGitHubData.name || `@${userGitHubData.login}`}</h1>
      <a href={userGitHubData.html_url}>
        <img className="user-profile-pic" src={userGitHubData.avatar_url}/>
      </a>
      <div className="user-visualizations-box">
        <D3ComponentTemplate data={dataForViz}/>
      </div>
      <input
        aria-label="Search bar for GitHub users"
        className="search-bar"
        placeholder="Search another user"
        value={newUserNameToSearch}
        onChange={event => setNewUserNameToSearch(event.target.value)}>
      </input>
      <Link to={{
        pathname:`/visualizations/${newUserNameToSearch}`,
      }}>
        <button>Search</button>
      </Link>
    </main>
  )
}

// Other User Properties to Use:
// {
//   "login": "octocat",
//   "id": 1,
//   "node_id": "MDQ6VXNlcjE=",
//   "avatar_url": "https://github.com/images/error/octocat_happy.gif",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/octocat",
//   "html_url": "https://github.com/octocat",
//   "followers_url": "https://api.github.com/users/octocat/followers",
//   "following_url": "https://api.github.com/users/octocat/following{/other_user}",
//   "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
//   "organizations_url": "https://api.github.com/users/octocat/orgs",
//   "repos_url": "https://api.github.com/users/octocat/repos",
//   "events_url": "https://api.github.com/users/octocat/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/octocat/received_events",
//   "type": "User",
//   "site_admin": false,
//   "name": "monalisa octocat",
//   "company": "GitHub",
//   "blog": "https://github.com/blog",
//   "location": "San Francisco",
//   "email": "octocat@github.com",
//   "hireable": false,
//   "bio": "There once was...",
//   "twitter_username": "monatheoctocat",
//   "public_repos": 2,
//   "public_gists": 1,
//   "followers": 20,
//   "following": 0,
//   "created_at": "2008-01-14T04:33:35Z",
//   "updated_at": "2008-01-14T04:33:35Z"
// }

export default ProfileVisualization;
