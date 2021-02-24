import React, { useEffect } from 'react';
import * as d3 from "d3";
import './D3ComponentTemplate.css';

const D3ComponentTemplate = (props) => {
  const data = props.data;
  // to test w/o fetched data:
  //const data = [1,2,3,4,5,6,7,8];

  const drawViz = () => {
  //BAR CHART EXAMPLE
    // const svg = d3.select(".viz")
    //   .append("svg")
    //   .attr("width", 700)
    //   .attr("height", 300)
    //   .style("margin-left", 100);
    //
    // svg.selectAll("rect")
    //   .exit()
    //   .remove()
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => 300 - 10 * d)
    //   .attr("width", 65)
    //   .attr("height", (d, i) => d * 10)
    //   .attr("fill", "green")

  }

  useEffect(() => {
    drawViz();
  }, [])

  return (
    <div className="viz">
    </div>
  )
}

export default D3ComponentTemplate;
