import React, { useState } from 'react';
import { Link } from "react-router-dom";
import GitHubActivityMap from './GitHubActivityMap';
import './Home.css';

const Home = (props) => {
  const [user, setUser] = useState(props.userNameToSearch)
  const [clicked, setClicked] = useState(false);


  return (
    <main>
      <input
        aria-label="Search bar for GitHub users"
        className="search-bar"
        placeholder="Search by GitHub username"
        value={props.userNameToSearch}
        onChange={event => setUser(event.target.value)}>
      </input>
      <Link to={{
        pathname:`/visualizations/${user}`
      }}>
        <button>Search</button>
      </Link>
      {!clicked && <button onClick={() => setClicked(true)}>Start demo!</button>}
      {clicked &&<GitHubActivityMap globalGitHubData={props.globalGitHubData} error={props.error}/>}
    </main>
  )
}

export default Home;
