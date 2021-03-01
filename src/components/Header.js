import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import home from './greenhouse-outline.png'

const Header = (props) => {
  return (
    <header>
      {props.home && <h1 className='title'>GitHub Garden</h1>}
      {!props.home &&
          <Link className='home-button' to='/'>
          <img onClick={() => props.setHome(true)} className='home-icon' src={home}/>
          </Link>
      }
    </header>
  )
}

export default Header;
