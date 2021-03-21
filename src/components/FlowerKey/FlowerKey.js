import React, { useState } from 'react';
import './FlowerKey.css';

const FlowerKey = (props) => {
  const [keySelection, setKeySelection] = useState('none');

  const keyOverview = `We grew a flower for every GitHub repository that @${props.user} owns and contributed to. Note that this does not include repositories this user forked but never edited.`

  const flowerHeadOverview = `The head of a flower is scaled according to the total lines of code in the repository, and there is a layer of petals for each of the repository's top three programming languages. The first layer is the most used language, and the second and third layers represent the second and third most used languages respectively.`

  const flowerHeadOverviewPtTwo = 'Each petal layer is colored according to the language it represents. Reference the color-language in the color key above.'

  const stemOverview = "The stem of a flower has a height representing the total active life of the repository, where active life is the time between the repository's creation date and its most recent update."

  const rootsOverview = "The roots of a flower represent the remote branches of a repository. E.g. a repository with 12 branches will produce a flower with 12 roots."

  return (
    <article className="flower-key-box">
      <section className="key-annotations">
        {keySelection === 'none'&& <><p className='annotation'>{keyOverview}</p><p className='annotation'>Click on sections of the flower to the right for more detail</p></>}
        {keySelection === 'flower'&& <><p className='annotation'>{flowerHeadOverview}</p><p className='annotation'>{flowerHeadOverviewPtTwo}</p></>}
        {keySelection === 'stem'&& <p className='annotation'>{stemOverview}</p>}
        {keySelection === 'roots'&&<p className='annotation'>{rootsOverview}</p>}
        <button className='learn-more' onClick={() => props.setShowExplainer(true)}>Learn More</button>
      </section>
      <svg className='flower-key' viewBox="-250 -200 700 700" >
        <svg x='-245' y='-245' className='flower-head-key' height='490' width='490' viewBox="-250 -150 500 300">
          <rect className='svg-clicker' onClick={() => {
            if(keySelection !== 'flower'){
              setKeySelection('flower')
            } else {
              setKeySelection('none')
            }
          }} height='270' width='270' x='-130' y='-150' stroke='none' fill='black'/>
          <path  d='M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0' stroke="white" fill="none"/>
          <path className='svg-clicker' onClick={() => {
            if(keySelection !== 'flower'){
              setKeySelection('flower')
            } else {
              setKeySelection('none')
            }
          }} d='M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0' transform='rotate(120)' stroke="white" fill="grey"/>
          <path d='M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0' transform='rotate(240)' stroke="white" fill="none"/>
          <path className='svg-clicker' onClick={() => {
            if(keySelection !== 'flower'){
              setKeySelection('flower')
            } else {
              setKeySelection('none')
            }
          }} d='M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0' transform='rotate(60)' stroke="white" fill="black"/>
          <path d='M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0' transform='rotate(180)' stroke="white" fill="none"/>
          <path d='M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0' transform='rotate(300)' stroke="white" fill="none"/>
          <path className='svg-clicker' onClick={() => {
            if(keySelection !== 'flower'){
              setKeySelection('flower')
            } else {
              setKeySelection('none')
            }
          }} d='M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0' stroke="white" fill="grey"/>
          <path d='M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0' transform='rotate(120)' stroke="white" fill="none"/>
          <path d='M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0' transform='rotate(240)' stroke="white" fill="none"/>
        </svg>
        <svg x='-25' y='120' className='stem-key-box' height='130' width='50' viewBox="-25 120 50 130">
          <rect className='svg-clicker' onClick={() => {
            if(keySelection !== 'stem'){
              setKeySelection('stem')
            } else {
              setKeySelection('none')
            }
          }} height='130' width='50' x='-25' y='120' stroke="none" fill="black"/>
        <path d='M0,120 L0,250' stroke="white" fill="none"/>
        </svg>
        <svg x='-100' y='250' className='root-key-box' height='50' width='200' viewBox="-100 250 200 50">
          <rect className='svg-clicker' onClick={() => {
            if(keySelection !== 'roots'){
              setKeySelection('roots')
            } else {
              setKeySelection('none')
            }
          }} x='-100' y='250' height='50' width='200' stroke='none' fill='black'/>
          <path d='M0,250 L-100,300' stroke="white"  fill="none"/>
          <path d='M0,250 L-5,310' stroke="white" fill="none"/>
          <path d='M0,250 L100,300' stroke="white" fill="none"/>
        </svg>
          <path  d='M130,120 L170,120 L170,250 L130,250' stroke="green" strokeDasharray="4 2" fill="none"/>
          <path  id="primary-lang" d='M31,-73 L310,-73' stroke="green" strokeDasharray="4 2" fill="none"/>
          <path  id="secondary-lang" d='M95,-30 L310,-30' stroke="green" strokeDasharray="4 2" fill="none"/>
          <path  id="tertiary-lang" d='M97,30 L310,30' stroke="green" strokeDasharray="4 2" fill="none"/>
          <path  d='M-100,320 L-100,350 L100,350 L100,320' stroke="green" strokeDasharray="4 2" fill="none"/>
          <path  d='M-125,-150 L-150,-150 L-150,120 L-125,120' stroke="green" strokeDasharray="4 2" fill="none"/>
          <path  id="active" d='M180,175 L240,175'/>
          <path  id="life" d='M180,190 L240,190'/>
          <path  id="branches" d='M-30,370 L50,370'/>
          <path  id="volume" d='M-220,-10 L-165,-10'/>
          <path  id="ofcode" d='M-230,5 L-165,5'/>
          <text fill="white">
            <textPath path="M-70,-180 L80,-180">
              1 flower = 1 repository
            </textPath>
            <textPath href="#primary-lang" startOffset="45%">
              primary language
            </textPath>
            <textPath href="#secondary-lang" startOffset="20%">
              secondary language
            </textPath>
            <textPath href="#tertiary-lang" startOffset="25%">
              tertiary language
            </textPath>
            <textPath href="#active">
              active
            </textPath>
            <textPath href="#life">
              life
            </textPath>
            <textPath href="#branches">
              branches
            </textPath>
            <textPath href="#volume">
              volume
            </textPath>
            <textPath href="#ofcode">
              of code
            </textPath>
          </text>
      </svg>
    </article>
  )
}
export default FlowerKey;
