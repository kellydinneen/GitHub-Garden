import React, {useState} from 'react';
import {FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon} from "react-share";
import './ShareModal.css';

const ShareModal = ({setClickedShare, userName}) => {

  return (
    <>
      <div className="modal-wrapper">
        <article className="modal">
          <button className="close" onClick={() => setClickedShare(false)}>X</button>
          <section className='share-modal-content'>
            <p>Share your garden to the social network of your choice!</p>
            <div className='share-icons'>
              <FacebookShareButton
                  url={`https://githubgarden.herokuapp.com/visualizations/${userName}`}
                  quote={`Garden of ${userName}`}
                  hashtag="#githubgarden"
                  className='share-button'>
                   <FacebookIcon size={36} round={true} />
              </FacebookShareButton>
              <LinkedinShareButton
                  title={`Garden of ${userName}`}
                  summary="A playful visualization of GitHub repositories. Built with D3.js and React"
                  source='GitHub Garden'
                  className='share-button'>
                   <LinkedinIcon size={36} round={true}/>
              </LinkedinShareButton>
              <TwitterShareButton
                  title={`Garden of ${userName}`}
                  hashtags={['#githubgarden', '#d3']}
                  className='share-button'>
                   <TwitterIcon size={36} round={true}/>
              </TwitterShareButton>
          </div>
          </section>
        </article>
      </div>
    </>
  )
}

export default ShareModal;
