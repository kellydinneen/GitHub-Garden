import * as d3 from "d3";

export const startingSampleRepositories = [{
  name: 'repository 1',
  branches: ['branch 1'],
  lifespan: 1,
  languages: []
}, {
  name: 'repository 2',
  branches: ['branch 1'],
  lifespan: 2,
  languages: []
}, {
  name: 'repository 3',
  branches: ['branch 1'],
  lifespan: 1,
  languages: ['language', 'language', 'language', 100]
}, {
  name: 'repository 4',
  branches: ['branch 1'],
  lifespan: 1,
  languages: ['language', 'language', 'language', 500]
}];

export const yQuantizeRelative = d3.scaleQuantize()
  .domain([minLifespan, maxLifespan])
  .range([550, 500, 450, 400, 350, 300, 250, 200])

export const yQuantizeAbsolute = d3.scaleQuantize()
  .domain([minLifespan, maxLifespan])
  .range([550, 500, 450, 400, 350, 300, 250, 200])

export const yThresholdRelative = d3.scaleThreshold()
  .domain([0.01 * maxLifespan, 0.1 * maxLifespan, 0.2 * maxLifespan, 0.4 * maxLifespan, 0.6 * maxLifespan, 0.8 * maxLifespan])
  .range([500, 450, 400, 350, 300, 250, 200])

export const yThresholdAbsolute = d3.scaleThreshold()
  .domain([1, 7, 30, 90, 180, 360])
  .range([500, 450, 400, 350, 300, 250, 200])

export const yLinearRelative = d3.scaleLinear()
  .domain([minLifespan, maxLifespan])
  .range([500, 450, 400, 350, 300, 250, 200])

export const yLinearAbsolute = d3.scaleLinear()
  .domain([0, 365])
  .range([500, 450, 400, 350, 300, 250, 200])

export const annotations = {
  1:,
  2:,
  3: ,
  4:
}
