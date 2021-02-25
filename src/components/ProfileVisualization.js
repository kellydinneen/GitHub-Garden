import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Garden from './Garden.js';
import './ProfileVisualization.css';
import pvAPI from './ProfileVisualizationApi';
import dataClean from './dataCleaning.js';

const ProfileVisualization = (props) => {
  const [userGitHubData, setUserGitHubData] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [lifespans, setLifespans] = useState([])
  const [branchNames, setBranchNames] = useState([]);
  const [repoLangs, setRepoLangs] = useState([]);
  const [cleanUserData, setCleanUserData] = useState([]);
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

  const getLifeSpans = () => {
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const repoAges = filteredRepos.map(repo => {
      const creationDate = new Date(repo.created_at).getTime();
      const lastUpdate = new Date(repo.updated_at).getTime();
      const repoAge = (lastUpdate - creationDate) / oneDayInMilliseconds
      return repoAge.toFixed(0)
    })
    setLifespans(repoAges)
  }

  const fetchRepoContributor = async () => {
    const userName = userGitHubData.login;
    const repoContainsUser = await Promise.all(
      userRepos.map(async repo => {
        try {
          const contributorsPromise = await pvAPI.fetchGitHubData(`${repo.contributors_url}`);
          const contributorsList = await contributorsPromise.json();
          const contributorNames = contributorsList.map(person => person.login);
          return contributorNames.includes(userName);
        } catch(err) {
          setError(err)
        }
    }));
    const filteredUserRepos = userRepos.filter((repo, index) => repoContainsUser[index]);
    await setFilteredRepos(filteredUserRepos);
  }

  const loadRepos = async () => {
    try {
      const userPromise = await pvAPI.fetchGitHubData(`https://api.github.com/users/${props.userNameToSearch}/repos`);
      const repoData = await userPromise.json();
      setUserRepos(repoData)
    } catch (err) {
      setError(err)
    }
  }

  const getLanguages = async () => {
    const languages = await Promise.all(
      filteredRepos.map(async repo => {
        try {
          const languagesPromise = await pvAPI.fetchGitHubData(`${repo.url}/languages`);
          const languagesList = await languagesPromise.json();
          return languagesList
        } catch(err) {
          setError(err)
        }
    }));
    setRepoLangs(languages)
  }

  const getBranchNames = async () => {
    const repoBranches = await Promise.all(
      filteredRepos.map(async repo => {
        try {
          const branchesPromise = await pvAPI.fetchGitHubData(`https://api.github.com/repos/${props.userNameToSearch}/${repo.name}/branches`);
          const branches = await branchesPromise.json();
          return branches
        } catch(err) {
          setError(err)
        }
    }));
    const namesOfBranches = repoBranches.map(repo => {
      const names = repo.map(branch => branch.name);
      return names
    })
    setBranchNames(namesOfBranches)
  }

  const consolidateData = () => {
    const cleanedUserData = filteredRepos.map((repo, index) => {
      return {
        name: repo.name,
        branches: branchNames[index],
        lifespan: lifespans[index],
        languages: repoLangs[index]
      }
    })
    setCleanUserData(cleanedUserData);
  }

  useEffect(() => {
    loadUser();
    loadRepos();
  }, [])

  useEffect(() => {
    fetchRepoContributor();
  }, [userRepos])

  useEffect(() => {
    getBranchNames();
    getLifeSpans();
    getLanguages();
  }, [filteredRepos])

  useEffect(() => {
    consolidateData();
  }, [repoLangs, branchNames])

  return (
    <main>
      <h1>{userGitHubData.name || `@${userGitHubData.login}`}</h1>
      <a href={userGitHubData.html_url}>
        <img className="user-profile-pic" src={userGitHubData.avatar_url}/>
      </a>
      <div className="user-visualizations-box">
        <Garden data={cleanUserData}/>
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

export default ProfileVisualization;
