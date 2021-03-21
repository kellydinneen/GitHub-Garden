import React, { useEffect, useState, useRef } from 'react';
import * as d3 from "d3";

const StemDemo = ({data, scale}) => {
  const stemContainer = useRef(null);
  console.log('scale', scale);

  const drawStems = () => {

    const stemBed = d3.select(stemContainer.current);
    d3.selectAll("stemBed > *").remove();
    const soilLine = stemBed.append('path')
      .attr('class', '.soil-line')
      .attr('d', 'M0,400 C100,300 150,450 200,410 C250,370 270,420 370,410 C450,370 470,420 480,360 C500,370 520,420 560,400 C600,370 620,420 660,400 C700,370 720,420 760,400 C800,300 850,450 900,410 C950,370 970,420 980,360 C1050,370 1070,420 1080,360 C1200,370 1220,420 1260,400 C1300,300 1350,450 1400,410 C1450,370 1470,420 1570,410 C1650,370 1670,420 1680,360 C1750,370 1770,420 1780,360 C1800,370 1820,420 1860,400 C1900,300 1950,450 2000,410')
      .attr('transform', 'scale(0.5)')
      .attr('stroke', 'grey')
      .attr('stroke-width', '3px')
      .attr('fill', 'none')

    const stem = stemBed.selectAll('.stem')
      .data(data).enter()
      .append('path')
      .attr('class','stem')
      .attr('d', d => `M0,600 L0,${scale(d)}`)
      .attr('transform', (d, i) => `translate(${100 + i * 200},0)`)
      .attr('stroke-width', 5)
      .attr('stroke', 'green')
      .attr('fill', 'none')
  }

  useEffect(() => {
    drawStems()
  }, [data, scale, stemContainer.current]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <svg
        className='stembed'
        viewBox='0 100 800 650'
        width='600'
        ref={stemContainer}
        >
    </svg>
  )
}

export default StemDemo;
