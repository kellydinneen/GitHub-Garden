import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './Garden.css';

const Garden = (props) => {

  const colorsByLanguage = {
    javascript: '#DE2016',
    html: '#BD3E54',
    css: '#FCD732',
    ruby:'#26369E',
    python:'#76678C',
    java:'#F19233'
  }

  const repositories = props.data;
  console.log(repositories.map(rep => rep.languages))
  // [
  //     {
  //      name: 'a',
  //      activeLife: 80,
  //      branches: ['branch 1', 'branch 2', 'branch 3', 'branch 4', 'branch 5'],
  //      languages: ['java', 'ruby']
  //     },
  //     {
  //      name: 'b',
  //      activeLife: 300,
  //      branches:['branch 1', 'branch 2', 'branch 3'],
  //      languages: ['javascript', 'css', 'html']
  //    },
  //    {
  //     name: 'c',
  //     activeLife: 165,
  //     branches:['branch 1', 'branch 2', 'branch 3', 'branch 4', 'branch 5', 'branch 6', 'branch 7', 'branch 8', 'branch 9', 'branch 10'],
  //     languages: ['css']
  //   },
  //   {
  //    name: 'd',
  //    activeLife: 5,
  //    branches:['branch 1'],
  //    languages: ['ruby']
  //  }
  // ]

  const gardenWidth = 200 * repositories.length;
  const gardenHeight = 800;

  const drawGarden = () => {
  //   //GET FLOWER BED
    const flowerBed = d3.select('svg');
  //
  //   //DEFINE SCALES
  //   //x-scale
  //
  //   //y-scale (based on repo age)
    const maxLifespan = d3.max(repositories, d => d.lifespan)
    const minLifespan = d3.min(repositories, d => d.lifespan)
    const yStemScale = d3.scaleQuantize()
      .domain([minLifespan, maxLifespan])
      .range([gardenHeight/2, gardenHeight/3, gardenHeight/4, gardenHeight/5])

  //
  //   //language to color scale
  const colorScale = d3.scaleOrdinal()
    .domain(Object.keys(colorsByLanguage))
    .range(Object.values(colorsByLanguage))
  //
  //   // //language use to petals scale
  //   // const numPetalsScale = d3.scaleQuantize()
  //   //   .domain()
  //
  //   // const flowerWidth = 900 / repositories.length
  //   //DRAW FLOWER CENTERS

  //
  //   // console.log('FLOWER CENTER', flower center)
  //
  //
  //   //DRAW PETAL LAYERS
  //   //multiple petals per layers
  //   //one layer for each language
  //   // const petalLayer =
  //   // console.log('PETAL LAYER', petalLayer)
  // const petalPath = 'M50,0 C100,40 100,70 70,100 L50,85 L30,100 M50,0 C 0,40 0,70 30,100';
  //
  // const petalGroup = flowerBed.selectAll('g')
  //   .data(repositories).enter().append('g')
  //   .attr('x', 0)
  //   .attr('y', 0)
  //   .attr('transform', (d,i) => `translate(${50 + i * 150}, ${yStemScale(d.lifespan)})`)
  //
  // petalGroup.append('path')
  //   .attr('d', petalPath)
  //   .attr('fill', d => colorScale(Object.keys(d.languages)[0]) || 'black')
  //   .attr('transform', `translate(-50, -130)`)
  // petalGroup.append('path')
  //   .attr('d', petalPath)
  //   .attr('fill', d => colorScale(Object.keys(d.languages)[0]))
  //   .attr('transform', `translate(-50, -130)rotate(120, 50, 110)`)
  // petalGroup.append('path')
  //   .attr('d', petalPath)
  //   .attr('fill', d => colorScale(Object.keys(d.languages)[0]))
  //   .attr('transform', `translate(-50, -130)rotate(240,  50, 110)`)
  const petalPathThree = 'M50,0 C70,40 80,70 70,150 L50,135 L30,150 M50,0 C 30,40 20,70 30,150';
  const petalPathTwo = 'M50,0 C90,40 80,70 70,120 L50,105 L30,120 M50,0 C 10,40 20,70 30,120';
  const petalPathOne = 'M50,0 C100,40 100,70 70,100 L50,85 L30,100 M50,0 C 0,40 0,70 30,100';
  const petalGroup = flowerBed.selectAll('.petal-layers')
    .data(repositories).enter().append('g')
    .attr('class', 'petal-layers')
    .attr('x', 0)
    .attr('y', 0)
    .attr('transform', (d,i) => `translate(${100 + i * 200}, ${yStemScale(d.lifespan)})`)

  petalGroup.append('path')
    .attr('d', petalPathThree)
    .attr('fill', d => colorScale(Object.keys(d.languages)[2]))
    .attr('transform', `translate(-50, -180)`)
  petalGroup.append('path')
    .attr('d', petalPathThree)
    .attr('fill', d => colorScale(Object.keys(d.languages)[2]))
    .attr('transform', `translate(-50, -180)rotate(120, 50, 160)`)
  petalGroup.append('path')
    .attr('d', petalPathThree)
    .attr('fill', d => colorScale(Object.keys(d.languages)[2]))
    .attr('transform', `translate(-50, -180)rotate(240 50 160)`)
  petalGroup.append('path')
    .attr('d', petalPathTwo)
    .attr('fill', d => colorScale(Object.keys(d.languages)[1]))
    .attr('transform', `translate(-50, -150)rotate(60 50 130)`)
  petalGroup.append('path')
    .attr('d', petalPathTwo)
    .attr('fill', d => colorScale(Object.keys(d.languages)[1]))
    .attr('transform', `translate(-50, -150)rotate(180 50 130)`)
  petalGroup.append('path')
    .attr('d', petalPathTwo)
    .attr('fill', d => colorScale(Object.keys(d.languages)[1]))
    .attr('transform', `translate(-50, -150)rotate(300 50 130)`)
  petalGroup.append('path')
    .attr('d', petalPathOne)
    .attr('fill', d => colorScale(Object.keys(d.languages)[0]))
    .attr('transform', `translate(-50, -130)`)
  petalGroup.append('path')
    .attr('d', petalPathOne)
    .attr('fill', d => colorScale(Object.keys(d.languages)[0]))
    .attr('transform', `translate(-50, -130)rotate(120, 50, 110)`)
  petalGroup.append('path')
    .attr('d', petalPathOne)
    .attr('fill', d => colorScale(Object.keys(d.languages)[0]))
    .attr('transform', `translate(-50, -130)rotate(240,  50, 110)`)

  //   DRAW STEMS
  //   height scaled to activeLife
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
      .attr('r', 25)
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
  //   // const root =
  //   // console.log('ROOTS', roots)
  }
  //
  useEffect(() => {
      drawGarden()
  }, [])

  return (
    <svg className='flowerbed' width={gardenWidth} height={gardenHeight}></svg>
  )
}

export default Garden;
