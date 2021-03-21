import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import './Garden.css';

const Garden = ({ data, setClickedRepo, animate, forwardedRef, textPathColor }) => {

  const repositories = data;
  const repositoryLives = repositories.map(repo => parseInt(repo.lifespan));

  const gardenWidth = 110 * repositories.length;
  const view = `0 100 ${200 * repositories.length} 700`

  const drawGarden = () => {
    const colorsByLanguage = {
      "JavaScript": '#FF8C00',
      "HTML": '#FF1493',
      "CSS": '#A62A2A',
      "SCSS": '#FFFF54',
      "Python": '#FF00FF',
      "Java": '#00BFFF',
      "Swift": '#00FF00',
      "TypeScript": '#7FFFD4',
      "C#": '#D2B48C',
      "PHP": '#6495ed',
      "C++": '#800000',
      "C": '#228B22',
      "Shell": '#2F4F4F',
      "Ruby": '#800080',
      "none": 'none'
    }
    const flowerBed = d3.select('.flowerbed');

    const soilLine = flowerBed.selectAll('.soil-line')
      .data(() => {
        let soilLines = [];
        repositories.forEach((repo, i) => {
          if(i % 5 === 0) {
            soilLines.push('soil');
          }
        })
        return soilLines;
      })
      .enter().append('path')
      .attr('class', '.soil-line')
      .attr('d', 'M0,400 C100,300 150,450 200,410 C250,370 270,420 370,410 C450,370 470,420 480,360 C500,370 520,420 560,400 C600,370 620,420 660,400 C700,370 720,420 760,400 C800,300 850,450 900,410 C950,370 970,420 980,360 C1050,370 1070,420 1080,360 C1200,370 1220,420 1260,400 C1300,300 1350,450 1400,410 C1450,370 1470,420 1570,410 C1650,370 1670,420 1680,360 C1750,370 1770,420 1780,360 C1800,370 1820,420 1860,400 C1900,300 1950,450 2000,410')
      .attr('transform', (d, i) => `translate(${i*1000}, 395)scale(0.5)`)
      .attr('stroke', 'grey')
      .attr('stroke-width', '3px')
      .attr('fill', 'none')

    const maxLifespan = d3.max(repositoryLives)
    const minLifespan = d3.min(repositoryLives)
    const mean = d3.mean(repositoryLives)
    const deviation = d3.deviation(repositoryLives)
    const repoAgeRange = repositoryLives.filter(age => {
      return age < (mean + 1.5 * deviation) && age > (mean - 1.5 * deviation);
    })

    const yStemScale = d3.scaleQuantize()
      .domain(d3.extent(repoAgeRange))
      .range([550, 525, 500, 475, 450, 425, 400, 375, 350, 325, 300, 275, 250])

    // const yStemScale = d3.scaleThreshold()
    //   .domain([0.01 * maxLifespan, 0.1 * maxLifespan, 0.2 * maxLifespan, 0.4 * maxLifespan, 0.6 * maxLifespan, 0.8 * maxLifespan])
    //   .range([500, 450, 400, 350, 300, 250, 200])

    // const yStemScale = d3.scaleQuantile()
    //   .domain(repositoryLives)
    //   .range([550, 500, 450, 350, 250])

    const rootBox = flowerBed.selectAll('.root-box')
      .data(repositories).enter().append('svg')
      .attr('class', '.root-box')
      .attr('height', '400')
      .attr('width', '300')
      .attr('viewBox','-150 0 300 450')
      .attr('x', (d, i) => i * 200 - 50)
      .attr('y', 600)

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
        const arrayOfLengths = [65, 70, 90, 95, 100, 110, 130, 135];
        const arrayOfCurves = [-15, -5, 0, 5, 6, 7, 10];
        const index = (array) => [Math.floor(Math.random() * array.length)];
        return `M0,0 C-10,30 ${arrayOfCurves[index(arrayOfCurves)]},60 0,${arrayOfLengths[index(arrayOfLengths)]}`;
      })
      .attr('transform', (d,i) => `rotate(${260 + (i+1) * d.rotationFactor})`)

    const stem = flowerBed.selectAll('.stem')
      .data(repositories).enter()
      .append('path')
      .attr('class','stem')
      .attr('id', (d, i) => `myStem${i}`)
      .attr('d', d => `M0,600 C 80 ${yStemScale(d.lifespan)}, -20 ${yStemScale(d.lifespan)}, 0 ${yStemScale(d.lifespan) - 20}`)
      .attr('transform', (d, i) => `translate(${100 + i * 200},0)`)
      .attr('stroke-width', 5)
      .attr('stroke', 'green')
      .attr('fill', 'none')

    if (animate) {
      flowerBed.selectAll('.repoName')
        .data(repositories).enter()
        .append('text')
        .append('textPath')
        .attr('xlink:href', (d, i) => `#myStem${i}`)
        .text(d => d.name)
        .attr('fill', 'white')
        .attr('font-size', '1.5rem')
        .attr('font-family', 'monospace')
        .attr('fill', textPathColor)

      const animation = () => {
        flowerBed.selectAll('.stem')
          .transition().duration(2000)
          .attr('d', d => `M0,600 C -20 ${yStemScale(d.lifespan)}, 20 ${yStemScale(d.lifespan)}, 0 ${yStemScale(d.lifespan) - 20}`)
            .attr('stroke', 'green')
          .transition().duration(2000)
          .attr('d', d => `M0,600 C 80 ${yStemScale(d.lifespan)}, -20 ${yStemScale(d.lifespan)}, 0 ${yStemScale(d.lifespan) - 20}`)
          .on("end", animation)
      }
        animation();
    }

    const linesOfCode = repositories.map(repo => repo.languages[repo.languages.length - 1]);
    const flowerSizeScale = d3.scaleQuantize()
      .domain([0, 100000])
      .range([0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85])
    const flowerCenterScale = d3.scaleQuantize()
      .domain([0, 100000])
      .range([0.5, 0.6, 0.7, 0.8, 0.9, 1])

    const petalPathThree = 'M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0';
    const petalPathTwo = 'M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0';
    const petalPathOne = 'M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0';
    const petalPaths = [petalPathOne, petalPathTwo, petalPathThree];
    const petalRotationStarts = [0,60,0];

    const flowerPositionBox = flowerBed.selectAll('.flower-box')
      .data(repositories).enter()
      .append('svg')
      .attr('class', '.flower-box')
      .attr('height', '300')
      .attr('width', '300')
      .attr('viewBox','-150 -150 300 300')
      .attr('x', (d, i) => i * 200 - 50)
      .attr('y', d => yStemScale(d.lifespan) - 175)
      .on('click', (e, d) => setClickedRepo(d))

    const petalLayer = flowerPositionBox.selectAll('.petal-layer')
      .data((d) => [
          {
            color: colorsByLanguage[d.languages[2]] || 'none',
            path: petalPaths[2],
            petalRotationStart: petalRotationStarts[2],
            scale: flowerSizeScale(d.languages[d.languages.length - 1])
          },
          {
            color: colorsByLanguage[d.languages[1]] || 'none',
            path: petalPaths[1],
            petalRotationStart: petalRotationStarts[1],
            scale: flowerSizeScale(d.languages[d.languages.length - 1])
          },
          {
            color: colorsByLanguage[d.languages[0]] || 'none',
            path: petalPaths[0],
            petalRotationStart: petalRotationStarts[0],
            scale: flowerSizeScale(d.languages[d.languages.length - 1])
          },
        ]
      )
      .enter()
      .append('g')
      .attr('class', 'petal-layer')

    const petal = petalLayer.selectAll('.petal')
      .data(d => [d,d,d])
      .enter().append('path')
      .attr('class', 'petal clicker')
      .attr('fill', d => d.color)
      .attr('d', d => d.path)
      .attr('transform', (d,i) => `rotate(${d.petalRotationStart + i * 120 || 0})scale(${d.scale})`)

    const flowerCenter = flowerBed.selectAll('circle')
      .data(repositories).enter()
      .append('circle')
      .attr('class', 'center clicker')
      .attr('r', d => 15 * flowerCenterScale(d.languages[d.languages.length - 1]))
      .attr('cx', (d, i) => 100 + i * 200)
      .attr('cy', d => yStemScale(d.lifespan) - 25)
      .attr('stroke-width', 1)
      .attr('stroke', '#0000FF')
      .attr('fill', '#0000FF')
      .on('click', (e, d) => setClickedRepo(d))

  }

  useEffect(() => {
    drawGarden()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    drawGarden()
  }, [textPathColor]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <svg ref={forwardedRef} className='flowerbed' viewBox={view} width={gardenWidth}></svg>
  )
}

export default Garden;
