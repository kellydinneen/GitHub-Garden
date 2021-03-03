import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import home from '../assets/greenhouse-outline.png'

const Header = (props) => {
  const [user, setUser] = useState(props.userNameToSearch)
  return (
    <header>
      {props.home && <h1 className='title'>GitHub Garden</h1>}
      {!props.home &&
        <>
          <Link className='home-button' to='/'>
            <img alt="A little greenhouse" className='home-icon' src={home}/>
          </Link>
        </>
      }
    </header>
  )
}

export default Header;
