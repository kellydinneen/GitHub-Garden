import React from 'react';
import Garden from '../Garden/Garden';
import './Modal.css';

const Modal = ({ setClickedRepo, repo}) => {
  console.log(repo)
  const languages = repo.languages.filter(lang => typeof(lang) === 'string')
    .map((el, index) => <p className="repo-langauge" key={index}>{el}</p>)
  return (
    <>
      <div className="modal-wrapper">
        <article className="modal">
          <button className="close" onClick={() => setClickedRepo('')}>X</button>
          <div className="all-wrapper">
            <Garden className="modal-garden" animate={false} data={[repo]}/>
            <div className="info-wrapper">
              <h1 className="repo-name">{repo.name}</h1>
              <h4 className="repo-lifespan">Active Age: {repo.lifespan} days</h4>
              <h4 className="languages-header">Top Languages Used:</h4>
              {languages}
              <h4 className="branches-header">Branches: {repo.branches.length}</h4>
              <a href={repo.link} target="_blank" rel="noreferrer">
                <button className="repo-link">Visit on GitHub</button>
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export default Modal;
