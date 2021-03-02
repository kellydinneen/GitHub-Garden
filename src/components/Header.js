import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import home from './greenhouse-outline.png'

const Header = (props) => {
  const [user, setUser] = useState(props.userNameToSearch)
  return (
    <header>
      {props.home && <h1 className='title'>GitHub Garden</h1>}
      {!props.home &&
        <>
          <Link className='home-button' to='/'>
          <img className='home-icon' src={home}/>
          </Link>
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
              <button
                className="search-btn"
                onClick={() => props.setUserChanged(true)}>Grow
              </button>
            </Link>
          </div>
        </>
      }
    </header>
  )
}

export default Header;
