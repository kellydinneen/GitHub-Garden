import React, { useEffect, useState, useRef } from 'react';
import './StemDemo.css';
import * as d3 from "d3";

const StemDemo = ({data, scale}) => {
  const stemContainer = useRef(null);
  console.log('scale', scale);

  const drawStems = () => {

    const stemBed = d3.select(stemContainer.current);
    const soilLine = stemBed.append('path')
      .attr('class', '.soil-line')
      .attr('d', 'M0,900 C100,950 150,950 200,910 C250,970 270,920 370,910 C450,970 470,920 480,960 C500,970 520,920 560,900 C600,970 620,920 660,900 C700,970 720,920 760,900 C800,900 850,950 900,910 C950,970 970,920 980,960 C1050,970 1070,920 1080,960 C1200,970 1220,920 1260,900 C1300,900 1350,950 1400,910 C1450,970 1470,920 1570,910 C1650,990 1670,920 1680,940 C1750,970 1770,920 1780,960 C1800,970 1820,920 1860,900 C1900,950 1950,950 2000,910')
      .attr('transform', 'scale(0.5)')
      .attr('stroke', 'grey')
      .attr('stroke-width', '3px')
      .attr('fill', 'none')

    const stem = stemBed.selectAll('.stem')
      .data(data).enter()
      .append('path')
      .attr('class','stem')
      .attr('d', d => `M0,470 L0,${scale(d)}`)
      .attr('transform', (d, i) => `translate(${100 + i * 200},0)`)
      .attr('stroke-width', 5)
      .attr('stroke', '#189a7e')
      .attr('fill', 'none')
  }

  useEffect(() => {
    stemContainer.current.innerHTML = "";
    drawStems()
  }, [data, scale, stemContainer.current]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <svg
        className='stembed'
        viewBox='0 0 800 600'
        width='600'
        ref={stemContainer}
        >
    </svg>
  )
}

export default StemDemo;
