import React, { useState } from 'react';
import { Link } from "react-router-dom";
import GitHubActivityMap from './GitHubActivityMap';
import './Home.css';

const Home = (props) => {
  return (
    <main>
      <input
        aria-label="Search bar for GitHub users"
        className="search-bar"
        placeholder="Search by GitHub username"
        value={props.userNameToSearch}
        onChange={event => props.setUserNameToSearch(event.target.value)}>
      </input>
      <Link to={{
        pathname:`/visualizations/${props.userNameToSearch}`
      }}>
        <button>Search</button>
      </Link>
      <GitHubActivityMap globalGitHubData={props.globalGitHubData} error={props.error}/>
    </main>
  )
}

export default Home;
