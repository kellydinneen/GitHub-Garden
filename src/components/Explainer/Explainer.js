import React, { useEffect, useState } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import FlowerDemo from '../FlowerDemo/FlowerDemo';
import StemDemo from '../StemDemo/StemDemo';
import {scaleSelection, overviews, scaleExplanations} from './explainerData';
import * as d3 from "d3";
import './Explainer.css';

const Explainer = (props) => {
  const [page, setPage] = useState('intro');
  const [lifespans, setLifespans] = useState([1,7,30,200]);
  const [lifespanMinMax, setLifespanMinMax] = useState([1, 200]);
  const [codeVolumes, setCodeVolumes] = useState([100, 2500, 3000, 10000]);
  const [codeMinMax, setCodeMinMax] = useState([100, 10000]);
  const [stemScale, setStemScale] = useState('quantize');
  const [flowerScale, setFlowerScale] = useState('quantize');

  const setScales = (event) => {
    console.log('setting scale', event.target.value)
    if(page === 'stem') {
      setStemScale(event.target.value)
    } else if (page === 'flower') {
      setFlowerScale(event.target.value)
    }
    console.log('set', stemScale);
  }

  useEffect(() => {
    setLifespanMinMax(() => {
      return [d3.min(lifespans), d3.max(lifespans)]
    })
  }, [lifespans]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCodeMinMax(() => {
      return [d3.min(codeVolumes), d3.max(codeVolumes)]
    })
  }, [codeVolumes]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <article className='explainer'>
      <button onClick={() => props.setShowExplainer(false)} className='back-to-garden-button'>Back to Garden</button>
      <section className='explainer-overview'>
        {overviews[page]}
        {page === 'intro' && <button onClick={() => setPage('stems')}>Next: Stem Scales</button>}
        {page === 'stems' && <>
          <button onClick={() => setPage('intro')}>Back to Overview</button>
          <button onClick={() => setPage('flowers')}>Next: Flower Scales</button>
        </>}
        {page === 'flowers' && <button onClick={() => setPage('stems')}>Back to Stem Scales</button>}
      </section>
      <section className='explainer-visual'>
        {page === 'stems' && <StemDemo data={lifespans} scale={scaleSelection(lifespanMinMax, 'stems', stemScale)}/>}
        {page === 'flowers' && <FlowerDemo data={codeVolumes} scale={scaleSelection(codeMinMax, 'flowers', stemScale)}/>}
      </section>
      <section className='inputs'>
        {page === 'stems' && <article className='range-inputs lifespan-inputs'>
              <Slider
                max={1000}
                min={0}
                value={lifespans[0]}
                onChange={value => setLifespans([value, lifespans[1], lifespans[2], lifespans[3]])} />
              <Slider
                max={1000}
                min={0}
                value={lifespans[1]}
                onChange={value => setLifespans([lifespans[0], value, lifespans[2], lifespans[3]])} />
              <Slider
                max={1000}
                min={0}
                value={lifespans[2]}
                onChange={value => setLifespans([lifespans[0], lifespans[1], value, lifespans[3]])} />
              <Slider
                max={1000}
                min={0}
                value={lifespans[3]}
                onChange={value => setLifespans([lifespans[0], lifespans[1], lifespans[2], value])} />
            </article>
        }
        {page === 'flowers' && <article className='range-inputs code-volume-inputs'>
              <Slider
                max={1000}
                min={0}
                value={codeVolumes[0]}
                onChange={value => setCodeVolumes([value, codeVolumes[1], codeVolumes[2], codeVolumes[3]])} />
              <Slider
                max={1000}
                min={0}
                value={codeVolumes[1]}
                onChange={value => setCodeVolumes([codeVolumes[0], value, codeVolumes[2], codeVolumes[3]])} />
              <Slider
                max={1000}
                min={0}
                value={codeVolumes[2]}
                onChange={value => setCodeVolumes([codeVolumes[0], codeVolumes[1], value, codeVolumes[3]])} />
              <Slider
                max={1000}
                min={0}
                value={codeVolumes[3]}
                onChange={value => setCodeVolumes([codeVolumes[0], codeVolumes[1], codeVolumes[2], value])} />
          </article>
        }
        {page !== 'intro' && <label>
          Select a scale:
          <select className="scale-input" value={stemScale} onChange={event => setScales(event)}>
            <option value="quantize">Quantize (relative)</option>
            <option value="quantizeAbsolute">Quantize (absolute)</option>
            <option value="threshold">Threshold (relative)</option>
            <option value="thresholdAbsolute">Threshold (absolute)</option>
            <option value="linear">Linear (relative)</option>
            <option value="linearAbsolute">Linear (absolute)</option>
          </select>
        </label>}
        <article className='scale-explainer'>
          {page === 'stems' && scaleExplanations.stems[stemScale]}
          {page === 'flowers' && scaleExplanations.flowers[flowerScale]}
        </article>
      </section>
    </article>
  )
}

export default Explainer;
