import React, { useEffect } from 'react';
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
  console.log(repositories.map(rep => rep.lifespan))
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

  const gardenWidth = 100 * repositories.length;
  const gardenHeight = 800;

  // const drawGarden = () => {
  //   //GET FLOWER BED
    const flowerBed = d3.select('svg');
    console.log(flowerBed);
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
  //
  //   // //language use to petals scale
  //   // const numPetalsScale = d3.scaleQuantize()
  //   //   .domain()
  //
  //   // const flowerWidth = 900 / repositories.length
  //   //DRAW FLOWER CENTERS
  const flowerCenter = flowerBed.selectAll('circle')
    .data(repositories).enter().append('circle')
    .attr('r', 20)
    .attr('cx', (d, i) => 50 + i * 100)
    .attr('cy', d => yStemScale(d.lifespan) - 20)
    .attr('stroke-width', 1)
    .attr('stroke', 'blue')
    .attr('fill', 'blue')
  //
  //   // console.log('FLOWER CENTER', flower center)
  //
  //
  //   //DRAW PETAL LAYERS
  //   //multiple petals per layers
  //   //one layer for each language
  //   // const petalLayer =
  //   // console.log('PETAL LAYER', petalLayer)
  //
  //   //DRAW STEMS
  //   //height scaled to activeLife
    const stem = flowerBed.selectAll('path')
      .data(repositories).enter().append('path')
      .attr('d', d => `M0,600 L0,${yStemScale(d.lifespan)}`)
      .attr('transform', (d, i) => `translate(${50 + i * 100},0)`)
      .attr('stroke-width', 5)
      .attr('stroke', 'green')
  //
  //   console.log('STEMS', stem)
  //
  //   //DRAW ROOTS
  //   //one root for each branch
  //   //text path w branch name
  //   // const root =
  //   // console.log('ROOTS', roots)
  // }
  //
  // useEffect(() => {
  //     drawGarden()
  // }, [])

  return (
    <svg className='flowerbed' width={gardenWidth} height={gardenHeight}></svg>
  )
}

export default Garden;
