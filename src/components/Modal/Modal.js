import React from 'react';
import './Modal.css'

const Modal = ({ setClickedRepo, repo}) => {
  return (
    <>
      <div className="modal-wrapper">
        <article className="modal">
          <button className="close" onClick={() => setClickedRepo('')}>X</button>
        </article>
      </div>
    </>
  )
}

export default Modal;
