import React from 'react';
// import { Link } from "react-router-dom";
import './Footer.css';
import gHLogo from '../assets/GHLogo.png';
import linkedInLogo from '../assets/linkedin-logo.png';

const Header = (props) => {
  return (
    <footer>
      <section>
        <p className='dev-name'>Kelly Dinneen</p>
        <a href='https://github.com/kellydinneen' target="_blank" rel="noreferrer">
          <img className='gh-logo' alt='GitHub Logo' src={gHLogo}/>
        </a>
        <a href='www.linkedin.com/in/kellydinneen' target="_blank" rel="noreferrer">
          <img className='linkedin-logo' alt='LinkedIn Logo' src={linkedInLogo}/>
        </a>
      </section>
      <section>
        <p className='dev-name'>Chris Spohn</p>
        <a href='https://github.com/CJSpohn' target="_blank" rel="noreferrer">
          <img className='gh-logo' alt='GitHub Logo' src={gHLogo}/>
        </a>
        <a href='https://www.linkedin.com/in/chris-spohn/' target="_blank" rel="noreferrer">
          <img className='linkedin-logo' alt='LinkedIn Logo' src={linkedInLogo}/>
        </a>
      </section>
    </header>
  )
}

export default Header;
