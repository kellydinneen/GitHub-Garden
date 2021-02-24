import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './ProfileVisualization.css';

const ProfileVisualization = (props) => {
  const [userGitHubData, setUserGitHubData] = useState([]);
  const [newUserNameToSearch, setNewUserNameToSearch] = useState('');
  const [error, setError] = useState('');

  const getUserGitHubData = async () => {
    const url = '';
    setError('');
    try {
      //some async stufff using props.userNameToSearch
      setUserGitHubData(['some data']);
    } catch(error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    getUserGitHubData()
  }, [])

  console.log(props);

  return (
    <main>
      <h1>Visualizations for @{props.userNameToSearch}'s GitHub'</h1>
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
