import React, { useState } from 'react';
import { Link } from "react-router-dom";
import GitHubActivityMap from '../GitHubActivityMap/GitHubActivityMap';
import Footer from '../Footer/Footer';
import './Home.css';

const Home = (props) => {
  const [user, setUser] = useState(props.userNameToSearch)
  const [clicked, setClicked] = useState(false);


  return (
    <>
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
            <button aria-label="Search for user" className="search-btn">grow</button>
          </Link>
        </div>
        {!clicked && <h2 className="or">OR</h2>}
        {!clicked &&
          <>
            <button aria-label="Start the map visualizations" className="map-btn" onClick={() => setClicked(true)}>
            </button>
            <h3>Click the globe to watch seeds get planted across the world.</h3>
          </>
        }
        {clicked && <GitHubActivityMap className="map" globalGitHubData={props.globalGitHubData} error={props.error}/>}
      </main>
      <Footer />
    </>
  )
}

export default Home;
