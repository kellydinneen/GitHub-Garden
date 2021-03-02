import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './FlowerKey.css';

const FlowerKey = (props) => {
  const [keySelection, setKeySelection] = useState('none');

  const keyOverview = `We grew a flower for every GitHub repository that ${props.user} owns and contributed to. Note that this does not include repositories this user forked but never edited. E.g. if your GitHub account holds 15 repositories, but three of them are forks that you never contributed to, only 12 flowers will grow in your garden.`

  const flowerHeadOverview = `The head of a flower is scaled according to the total lines of code in the repository, and there is a layer of petals for the repository's top three programming languages. The first layer is the most used language, and the second and third layers represent the second and third most used languages respectively. Each petal layer is colored according to the language it represents. E.g. a repository that uses primarily Javascript and a bit of HTML will have a red front layer representing Javascript, a blue second layer representing HTML, and no third layer. Reference all of the color-language pairings in the color key at the bottom of the page.`

  const stemOverview = "The stem of a flower has a height representing the total active life of the repository, where active life is the time between the repository's creation date and it's most recent update. E.g. a repository that was edited for only 1 week will produce a much shorter flower than a repository edited over 10 weeks. You can also see the names of repositories lining each stem."

  const rootsOverview = "The roots of a flower represent the remote branches of a repository. E.g. a repository with 12 branches will produce a flower with 12 roots."

  return (
    <article className="flower-key-box">
      <section className="key-annotations">
        {keySelection === 'none'&& <p>{keyOverview}</p>}
        {keySelection === 'flower'&& <p>{flowerHeadOverview}</p>}
        {keySelection === 'stem'&& <p>{stemOverview}</p>}
        {keySelection === 'roots'&&<p>{rootsOverview}</p>}
      </section>
      <svg className='flower-key' viewBox="-250 -200 600 600" >
          <path  d='M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0' stroke="white" fill="none"/>
          <path d='M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0' transform='rotate(120)' stroke="white" fill="grey"/>
          <path d='M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0' transform='rotate(240)' stroke="white" fill="none"/>
          <path  d='M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0' transform='rotate(60)' stroke="white" fill="black"/>
          <path d='M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0' transform='rotate(180)' stroke="white" fill="none"/>
          <path d='M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0' transform='rotate(300)' stroke="white" fill="none"/>
          <path  d='M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0' stroke="white" fill="grey"/>
          <path d='M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0' transform='rotate(120)' stroke="white" fill="none"/>
          <path d='M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0' transform='rotate(240)' stroke="white" fill="none"/>
          <path  d='M0,120 L0,250' stroke="white" fill="none"/>
          <path  d='M0,250 L-100,300' stroke="white"  fill="none"/>
          <path  d='M0,250 L-5,310' stroke="white" fill="none"/>
          <path  d='M0,250 L100,300' stroke="white" fill="none"/>
          <path  d='M130,120 L170,120 L170,250 L130,250' stroke="green" stroke-dasharray="4 2" fill="none"/>
          <path  id="primary-lang" d='M31,-73 L250,-73' stroke="green" stroke-dasharray="4 2" fill="none"/>
          <path  id="secondary-lang" d='M95,-30 L250,-30' stroke="green" stroke-dasharray="4 2" fill="none"/>
          <path  id="tertiary-lang" d='M97,30 L250,30' stroke="green" stroke-dasharray="4 2" fill="none"/>
          <path  d='M-100,320 L-100,350 L100,350 L100,320' stroke="green" stroke-dasharray="4 2" fill="none"/>
          <path  d='M-125,-150 L-150,-150 L-150,120 L-125,120' stroke="green" stroke-dasharray="4 2" fill="none"/>
          <text fill="white">
            <textPath path="M-70,-180 L80,-180">
              1 flower = 1 repository
            </textPath>
            <textPath href="#primary-lang" startOffset="50%">
              primary language
            </textPath>
            <textPath href="#secondary-lang" startOffset="20%">
              secondary language
            </textPath>
            <textPath href="#tertiary-lang" startOffset="28%">
              tertiary language
            </textPath>
            <textPath path="M180,175 L220,175">
              active
            </textPath>
            <textPath path="M180,190 L220,190">
              life
            </textPath>
            <textPath path="M-30,370 L50,370">
              branches
            </textPath>
            <textPath path="M-210,-10 L-165,-10">
              volume
            </textPath>
            <textPath path="M-210,5 L-165,5">
              of code
            </textPath>
          </text>
      </svg>
    </article>
  )
}
export default FlowerKey;
