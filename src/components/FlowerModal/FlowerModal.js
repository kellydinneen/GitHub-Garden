import React from 'react';
import Garden from '../Garden/Garden';
import './FlowerModal.css';

const FlowerModal = ({ setClickedRepo, repo}) => {
  const languages = repo.languages.filter(lang => typeof(lang) === 'string')
    .map((el, index) => <p className="repo-language" key={index}>{el}</p>)
  return (
    <>
      <div className="flower-modal-wrapper">
        <article className="flower-modal">
          <button className="close" onClick={() => setClickedRepo('')}>X</button>
          <div className="all-wrapper">
            <Garden animate={false} data={[repo]}/>
            <div className="info-wrapper">
              <h1 className="repo-name">{repo.name}</h1>
              <h4 className="repo-lifespan">Active Age: {repo.lifespan} days</h4>
              <h4 className="languages-header">Top Languages Used:</h4>
              {languages.length ? languages : <p>No code found!</p>}
              <h4 className="branches-header">Branches: {repo.branches.length}</h4>
            </div>
          </div>
          <a href={repo.link} target="_blank" rel="noreferrer">
          <button className="repo-link">View on GitHub</button>
          </a>
        </article>
      </div>
    </>
  )
}

export default FlowerModal;
