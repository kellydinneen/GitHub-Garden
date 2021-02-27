import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './Garden.css';

const Garden = (props) => {

  const repositories = props.data;
  console.log(repositories);

  const gardenWidth = 200 * repositories.length;
  const gardenHeight = 800;

  const drawGarden = () => {
    const flowerBed = d3.select('svg');

    const maxLifespan = d3.max(repositories, d => d.lifespan)
    const minLifespan = d3.min(repositories, d => d.lifespan)

    const yStemScale = d3.scaleQuantize()
      .domain([minLifespan, maxLifespan])
      .range([gardenHeight/2, gardenHeight/3, gardenHeight/4, gardenHeight/5])

    const flowerSizeScale = d3.scaleQuantize()
      .domain([minLifespan, maxLifespan])
      .range([0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1])

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
      .data((d) => {
        console.log('data from flower:', d);
        return [
          {
            color: colorsByLanguage[d.languages[2]],
            path: petalPaths[2],
            petalRotationStart: petalRotationStarts[2],
            scale: flowerSizeScale(d.lifespan)
          },
          {
            color: colorsByLanguage[d.languages[1]],
            path: petalPaths[1],
            petalRotationStart: petalRotationStarts[1],
            scale: flowerSizeScale(d.lifespan)
          },
          {
            color: colorsByLanguage[d.languages[0]],
            path: petalPaths[0],
            petalRotationStart: petalRotationStarts[0],
            scale: flowerSizeScale(d.lifespan)
          },
        ];
      })
      .enter().append('g')
      .attr('class', 'petal-layer')

    const petal = petalLayer.selectAll('.petal')
      .data(d => [d,d,d])
      .enter().append('path')
      .attr('class', 'petal')
      .attr('fill', d => d.color)
      .attr('d', d => d.path)
      .attr('transform', (d,i) => `rotate(${d.petalRotationStart + i * 120 || 0})scale(${d.scale})`)

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


    flowerBed.selectAll('.repoName')
      .data(repositories).enter()
      .append('text')
      .append('textPath')
      .attr('xlink:href', (d, i) => `#myStem${i}`)
      .text(d => d.name)
      .attr('font-size', '1.5rem')

    const flowerCenter = flowerBed.selectAll('circle')
      .data(repositories).enter().append('circle')
      .attr('r', 15)
      .attr('cx', (d, i) => 100 + i * 200)
      .attr('cy', d => yStemScale(d.lifespan) - 20)
      .attr('stroke-width', 1)
      .attr('stroke', 'blue')
      .attr('fill', 'blue')
      //Append the month names to each slice


  //   console.log('STEMS', stem)
  //
  //   //DRAW ROOTS
  //   //one root for each branch
  //   //text path w branch name


  useEffect(() => {
      drawGarden()
  }, [])

  return (
    <svg className='flowerbed' width={gardenWidth} height={gardenHeight}></svg>
  )
}

export default Garden;
