import React from 'react';
import './GitHubActivityMap.css';

const GitHubActivityMap = (props) => {

  //d3 and leaflet stuff

  return (
    <div className='github-activity-map-container'>
      { props.error && props.error }
      {!props.error &&
        //would be d3 and leaflet stuff
        <h1>{props.globalGitHubData}</h1>
      }
    </div>
  )
}
export default GitHubActivityMap;
