import React, { useEffect, useState } from 'react';
import {scales, overviews} from './explainerData'
import * as d3 from "d3";
import './Explainer.css';

const Explainer = () => {
  const {page, setPage} = useState('intro');
  const {repoLifespans, setRepoLifespans} = useState([1,7,30,360]);
  const {repoCodeVolumes, setRepoCodeVolumes} = useState([100, 2500, 3000, 10000]);
  const {stemScale, setStemScale} = useState();
  const {flowerScale, setFlowerScale} = useState();


  const drawStems = () => {
    const stemBed = d3.select('.stembed');
    const defaultData = repoLifespans;

    const soilLine = stemBed.append('path')
      .attr('class', '.soil-line')
      .attr('d', 'M0,400 C100,300 150,450 200,410 C250,370 270,420 370,410 C450,370 470,420 480,360 C500,370 520,420 560,400 C600,370 620,420 660,400 C700,370 720,420 760,400 C800,300 850,450 900,410 C950,370 970,420 980,360 C1050,370 1070,420 1080,360 C1200,370 1220,420 1260,400 C1300,300 1350,450 1400,410 C1450,370 1470,420 1570,410 C1650,370 1670,420 1680,360 C1750,370 1770,420 1780,360 C1800,370 1820,420 1860,400 C1900,300 1950,450 2000,410')
      .attr('transform', 'scale(0.5)')
      .attr('stroke', 'grey')
      .attr('stroke-width', '3px')
      .attr('fill', 'none')

    const maxLifespan = d3.max(repoLifespans)
    const minLifespan = d3.min(repoLifespans)
    const scale = stemScale(minLifespan, maxLifespan);

    const stem = flowerBed.selectAll('.stem')
      .data(defaultData).enter()
      .append('path')
      .attr('class','stem')
      .attr('d', d => `M0,600 L0,${scale(d)}`)
      .attr('transform', (d, i) => `translate(${100 + i * 200},0)`)
      .attr('stroke-width', 5)
      .attr('stroke', 'green')
      .attr('fill', 'none')
  }

  const drawFlowers = () => {
    const flowerBox = d3.select('.flowerbox');
    const defaultData = repoCodeVolumes;

    const maxVolume = d3.max(repoCodeVolumes);
    const minVolume = d3.min(repoCodeVolumes);
    const scale = flowerScale(minVolume, maxVolume);

    const petalPathThree = 'M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0';
    const petalPathTwo = 'M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0';
    const petalPathOne = 'M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0';
    const petalPaths = [petalPathOne, petalPathTwo, petalPathThree];
    const petalRotationStarts = [0,60,0];

    const flowerPositionBox = flowerBed.selectAll('.flower-box')
      .data(defaultData).enter()
      .append('svg')
      .attr('class', '.flower-box')
      .attr('height', '300')
      .attr('width', '300')
      .attr('viewBox','-150 -150 300 300')
      .attr('x', (d, i) => i * 200 - 50)

      const petalLayer = flowerPositionBox.selectAll('.petal-layer')
        .data((d) => [
            {
              color: 'grey',
              path: petalPaths[2],
              petalRotationStart: petalRotationStarts[2],
              scale: scale(d)
            },
            {
              color: 'black',
              path: petalPaths[1],
              petalRotationStart: petalRotationStarts[1],
              scale: scale(d)
            },
            {
              color: 'white',
              path: petalPaths[0],
              petalRotationStart: petalRotationStarts[0],
              scale: scale(d)
            },
          ]
        )
        .enter()
        .append('g')
        .attr('class', 'petal-layer')

      const petal = petalLayer.selectAll('.petal')
        .data(d => [d,d,d])
        .enter().append('path')
        .attr('class', 'petal')
        .attr('fill', d => d.color)
        .attr('d', d => d.path)
        .attr('transform', (d,i) => `rotate(${d.petalRotationStart + i * 120 || 0})scale(${d.scale})`)
  }

  useEffect(() => {
    drawStems()
  }, [stemScale, repoLifespans]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    drawFlowers()
  }, [flowerScale, repoCodeVolumes]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button onClick={() => props.setShowExplainer(false)} className='back-to-garden-button'>Back to Garden</button>
      <section className='explainer-overview'>
        {overviews[page]}
        {page === 'intro' && <button onClick={() => {
          setPage('stems');
          drawStems();
        }}>Next: Stem Scales</button>}
        {page === 'stems' && <>
          <button onClick={() => setPage('intro')}>Back to Overview</button>
          <button onClick={() => {
            setPage('flowers');
            drawFlowers();
          }}>Next: Flower Scales</button>
        </>}
        {page === 'flowers' && <button onClick={() => {
          setPage('stems');
          drawStems();
        }}>Back to Stem Scales</button>}
      </section>
      <section className='explainer-visual'>
        {page === 'stems' && <svg
          className='stembed'
          viewBox=`0 100 800 650`
          width='800'>
        </svg>}
        {page === 'flowers' && <svg
          className='flowerbox'
          viewBox=`0 100 800 650`
          width='800'>
        </svg>}
      </section>
      <section className='inputs'>
        {}
      </section>
    </>
  )
}

export default Explainer;
