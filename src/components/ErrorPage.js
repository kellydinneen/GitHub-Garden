import React from 'react';
import './ErrorPage.css'
import deadPlants from './deadplants.png'

const ErrorPage = (props) => {
  return(
    <div className="error-div">
      <p className="error-message">{props.message} {props.user && props.user}</p>
      <img className="dead-garden" src={deadPlants} alt="A sad wilting flower"></img>
    </div>
  )
}

export default ErrorPage;
