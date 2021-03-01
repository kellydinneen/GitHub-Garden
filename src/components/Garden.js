import React, { useEffect } from 'react';
import * as d3 from "d3";
import './Garden.css';

const Garden = (props) => {

  const repositories = props.data;

  const gardenWidth = 200 * repositories.length;

  const drawGarden = () => {
    const flowerBed = d3.select('.flowerbed');

    const maxLifespan = d3.max(repositories, d => d.lifespan)
    const minLifespan = d3.min(repositories, d => d.lifespan)

    const yStemScale = d3.scaleQuantize()
      .domain([minLifespan, maxLifespan])
      .range([550, 500, 450, 400, 350, 300, 250, 200])

      const stem = flowerBed.selectAll('.stem')
        .data(repositories).enter()
        .append('path')
        .attr('class','stem')
        .attr('id', (d, i) => `myStem${i}`)
        .attr('d', d => `M0,600 C 80 ${yStemScale(d.lifespan)}, -20 ${yStemScale(d.lifespan)}, 0 ${yStemScale(d.lifespan)}`)
        .attr('transform', (d, i) => `translate(${100 + i * 200},0)`)
        .attr('stroke-width', 5)
        .attr('stroke', 'green')
        .attr('fill', 'none')

        const animate = () => {
          flowerBed.selectAll('.stem')
            .transition().duration(2000)
            .attr('d', d => `M0,600 C -20 ${yStemScale(d.lifespan)}, 20 ${yStemScale(d.lifespan)}, 0 ${yStemScale(d.lifespan)}`)
              .attr('stroke', 'green')
            .transition().duration(2000)
            .attr('d', d => `M0,600 C 80 ${yStemScale(d.lifespan)}, -20 ${yStemScale(d.lifespan)}, 0 ${yStemScale(d.lifespan)}`)
            .on("end", animate)
        }
      animate();

    const flowerSizeScale = d3.scaleQuantize()
      .domain([minLifespan, maxLifespan])
      .range([0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85])

    const colorsByLanguage = {
      "JavaScript": '#DE2016',
      "HTML": '#FF3EAA',
      "CSS": '#FCD732',
      "SCSS":'#26369E',
      "Python":'#76678C',
      "Java":'#F19233',
      "none": 'none'
      }

    const petalPathThree = 'M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0';
    const petalPathTwo = 'M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0';
    const petalPathOne = 'M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0';
    const petalPaths = [petalPathOne, petalPathTwo, petalPathThree];
    const petalRotationStarts = [0,60,0];

    const flowerPositionBox = flowerBed.selectAll('.flower-box')
      .data(repositories).enter().append('svg')
      .attr('class', '.flower-box')
      .attr('height', '300')
      .attr('width', '300')
      .attr('viewBox','-150 -150 300 300')
      .attr('x', (d, i) => i * 200 - 50)
      .attr('y', d => yStemScale(d.lifespan) - 175)

    const petalLayer = flowerPositionBox.selectAll('.petal-layer')
      .data((d) => [
          {
            color: colorsByLanguage[d.languages[2]] || 'none',
            path: petalPaths[2],
            petalRotationStart: petalRotationStarts[2],
            scale: flowerSizeScale(d.lifespan)
          },
          {
            color: colorsByLanguage[d.languages[1]] || 'none',
            path: petalPaths[1],
            petalRotationStart: petalRotationStarts[1],
            scale: flowerSizeScale(d.lifespan)
          },
          {
            color: colorsByLanguage[d.languages[0]] || 'none',
            path: petalPaths[0],
            petalRotationStart: petalRotationStarts[0],
            scale: flowerSizeScale(d.lifespan)
          },
        ]
      )
      .enter().append('g')
      .attr('class', 'petal-layer')

    const petal = petalLayer.selectAll('.petal')
      .data(d => [d,d,d])
      .enter().append('path')
      .attr('class', 'petal')
      .attr('fill', d => d.color)
      .attr('d', d => d.path)
      .attr('transform', (d,i) => `rotate(${d.petalRotationStart + i * 120 || 0})scale(${d.scale})`)

    flowerBed.selectAll('circle')
      .data(repositories).enter().append('circle')
      .attr('r', 15)
      .attr('cx', (d, i) => 100 + i * 200)
      .attr('cy', d => yStemScale(d.lifespan) - 20)
      .attr('stroke-width', 1)
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

      flowerBed.selectAll('.repoName')
        .data(repositories).enter()
        .append('text')
        .append('textPath')
        .attr('xlink:href', (d, i) => `#myStem${i}`)
        .text(d => d.name)
        .attr('font-size', '1.5rem')

      const rootBox = flowerBed.selectAll('.root-box')
        .data(repositories).enter().append('svg')
        .attr('class', '.root-box')
        .attr('height', '200')
        .attr('width', '200')
        .attr('viewBox','-150 -150 300 300')
        .attr('x', (d, i) => i * 200)
        .attr('y', 500)

      const root = rootBox.selectAll('.root')
        .data(d => d.branches.map(branch => {
          return {
            repo: d.name,
            name: branch,
            rotationFactor: d.branches.length === 1 ? -260 : 160 / d.branches.length
          }
        }))
        .enter().append('path')
        .attr('class', 'root')
        .attr('fill', 'green')
        .attr('stroke', 'green')
        .attr('id', (d,i) => `${d.name + i}`)
        .attr('d', () => {
          const arrayOfLengths = [110, 130, 150, 170, 180, 190, 210, 250];
          const arrayOfCurves = [-20, -5, 5, 10, 15, 20, 25];
          const index = (array) => [Math.floor(Math.random() * array.length)];
          return `M0,0 C-10,40 ${arrayOfCurves[index(arrayOfCurves)]},100 0,${arrayOfLengths[index(arrayOfLengths)]}`;
        })
        .attr('transform', (d,i) => `rotate(${260 + (i+1) * d.rotationFactor})`)

    }

  useEffect(() => {
      drawGarden()
  }, [])

  return (
    <svg className='flowerbed' viewBox='0 0 2000 800' width={gardenWidth}></svg>
  )
}

export default Garden;
