import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

const FlowerDemo = ({data, scale}) => {
  const flowerContainer = useRef(null);

  const drawFlowers = () => {
    const flowerBox = d3.select(flowerContainer.current);

    const petalPathThree = 'M0,-150 C20,-110 30,-80 20,0 L0,-15 L-20,0 M0,-150 C-20,-110 -30,-80 -20,0';
    const petalPathTwo = 'M0,-120 C40,-80 30,-50 20,0 L0,-15 L-20,0 M0,-120 C-40,-80 -30,-50 -20,0';
    const petalPathOne = 'M0,-100 C50,-60 50,-30 20,0 L0,-15 L-20,0 M0,-100 C-50,-60 -50,-30 -20,0';
    const petalPaths = [petalPathOne, petalPathTwo, petalPathThree];
    const petalRotationStarts = [0,60,0];

    const flowerPositionBox = flowerBox.selectAll('.flower-box')
      .data(data).enter()
      .append('svg')
      .attr('class', '.flower-box')
      .attr('height', '300')
      .attr('width', '300')
      .attr('viewBox','-150 -150 300 300')
      .attr('x', (d, i) => i * 200)

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

      petalLayer.selectAll('.petal')
        .data(d => [d,d,d])
        .enter().append('path')
        .attr('class', 'petal')
        .attr('fill', d => d.color)
        .attr('d', d => d.path)
        .attr('transform', (d,i) => `rotate(${d.petalRotationStart + i * 120 || 0})scale(${d.scale})`)

  }

  useEffect(() => {
    flowerContainer.current.innerHTML = "";
    drawFlowers()
  }, [data, scale, flowerContainer.current]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <div
          className='flowerbox'
          ref={flowerContainer}>
      </div>
  )
}

export default FlowerDemo;
