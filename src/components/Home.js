import React, { useState } from 'react';
import { Link } from "react-router-dom";
import GitHubActivityMap from './GitHubActivityMap';
import './Home.css';

const Home = (props) => {
  const [user, setUser] = useState(props.userNameToSearch)
  const [clicked, setClicked] = useState(false);


  return (
    <main>
    <div className="search-wrapper">
      <input
        aria-label="Search bar for GitHub users"
        className="search-bar"
        placeholder="Enter a GitHub username"
        value={props.userNameToSearch}
        onChange={event => setUser(event.target.value)}>
      </input>
      <Link to={{
        pathname:`/visualizations/${user}`
      }}>
        <button className="search-btn" onClick={() => props.setHome(false)}>Grow</button>
      </Link>
    </div>
      {!clicked && <h2 className="or">OR</h2>}
      {!clicked && <button className="map-btn" onClick={() => setClicked(true)}>
        Watch seeds get planted across the world.
      </button>}
      <div className="map-loader"></div>
        {clicked && <GitHubActivityMap className="map" globalGitHubData={props.globalGitHubData} error={props.error}/>}
    </main>
  )
}

export default Home;
