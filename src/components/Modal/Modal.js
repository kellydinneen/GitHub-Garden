import React from 'react';
import './Modal.css'

const Modal = ({ setClickedRepo, repo}) => {
  console.log(repo)
  const languages = repo.languages.map((el, index) => <p className="repo-langauge" key={index}>{el}</p>)
  return (
    <>
      <div className="modal-wrapper">
        <article className="modal">
          <button className="close" onClick={() => setClickedRepo('')}>X</button>
          <h3 className="repo-name">{repo.name}</h3>
          <h4 className="repo-lifespan">{repo.lifespan}</h4>
          <h4 className="languages-header">Languages:</h4>
          {languages}
          <a href={repo.link} target="_blank" rel="noreferrer">
            <button className="repo-link">Visit on GitHub</button>
          </a>
        </article>
      </div>
    </>
  )
}

export default Modal;
