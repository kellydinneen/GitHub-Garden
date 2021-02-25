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

  const repositories = [
      {
       name: 'a',
       activeLife: 80,
       branches: ['branch 1', 'branch 2', 'branch 3', 'branch 4', 'branch 5'],
       languages: ['java', 'ruby']
      },
      {
       name: 'b',
       activeLife: 300,
       branches:['branch 1', 'branch 2', 'branch 3'],
       languages: ['javascript', 'css', 'html']
     },
     {
      name: 'c',
      activeLife: 165,
      branches:['branch 1', 'branch 2', 'branch 3', 'branch 4', 'branch 5', 'branch 6', 'branch 7', 'branch 8', 'branch 9', 'branch 10'],
      languages: ['css']
    },
    {
     name: 'd',
     activeLife: 5,
     branches:['branch 1'],
     languages: ['ruby']
   }
  ]

  const gardenWidth = 1000;
  const gardenHeight = 500;

  const drawGarden = () => {
    //GET FLOWER BED

    //DEFINE SCALES
    //x-scale

    //y-scale (based on repo age)

    //language to color scale

    // //language use to petals scale
    // const numPetalsScale = d3.scaleQuantize()
    //   .domain()

    // const flowerWidth = 900 / repositories.length
    //DRAW FLOWER CENTERS


    // console.log('FLOWER CENTER', flower center)


    //DRAW PETAL LAYERS
    //multiple petals per layers
    //one layer for each language
    // const petalLayer =
    // console.log('PETAL LAYER', petalLayer)

    //DRAW STEMS
    //height scaled to activeLife


    // console.log('STEMS', stem)

    //DRAW ROOTS
    //one root for each branch
    //text path w branch name
    // const root =
    // console.log('ROOTS', roots)
  }

  useEffect(() => {
    drawGarden();
  }, [])

  return (
    <main>
      <svg className='flowerbed' width={gardenWidth} height={gardenHeight}></svg>
    </main>
  )
}

export default Garden;
