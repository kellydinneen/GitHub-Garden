import React from 'react';
import './ProfileLoader.css';
import wateringCan from '../assets/watering-can-converted.png';

const ProfileLoader = () => {
  return (
    <>
      <img src={wateringCan} alt="A lovely little watering can." className="watering-can"></img>
      <div className="rain">
        <div className="droplet d1"></div>
        <div className="droplet d2"></div>
        <div className="droplet d3"></div>
        <div className="droplet d4"></div>
        <div className="droplet d5"></div>
        <div className="droplet d6"></div>
        <div className="droplet d7"></div>
        <div className="droplet d8"></div>
        <div className="droplet d9"></div>
        <div className="droplet d10"></div>
        <div className="droplet d11"></div>
        <div className="droplet d12"></div>
      </div>
    </>
  )
}

export default ProfileLoader;
