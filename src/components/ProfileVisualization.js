import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './ProfileVisualization.css';

const ProfileVisualization = (props) => {
  const [userGitHubData, setUserGitHubData] = useState([]);
  const [newUserNameToSearch, setNewUserNameToSearch] = useState('');
  const [error, setError] = useState('');

  const fetchUserGitHubData = async () => {
    try {
      const result = await fetch(`https://api.github.com/users/${props.userNameToSearch}`, {
        headers: {
          authorization: `token ${process.env.REACT_APP_GH_KEY}`
        }
      })
      const userData = await result.json();
      setUserGitHubData(userData);
      console.log(userGitHubData);;
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchUserGitHubData()
  }, [])

  return (
    <main>
      <h1>{userGitHubData.name || `@${userGitHubData.login}`}</h1>
      <a href={userGitHubData.html_url}>
        <img src={userGitHubData.avatar_url}/>
      </a>
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
