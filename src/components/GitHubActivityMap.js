import React, { useEffect, useState } from 'react';
import './GitHubActivityMap.css';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
const dotEnv = require('dotenv').config();


const GitHubActivityMap = (props) => {

  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [ghError, setGhError] = useState('');
  const [individualError, setIndividualError] = useState('');
  const [geoErrors, setGeoErrors] = useState([]);
  const [currentMarker, setCurrentMarker] = useState('');

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const result = await fetch('https://api.github.com/events?per_page=100', {
  //         headers: {
  //           authorization: `token ${process.env.REACT_APP_GH_KEY}`
  //         }
  //       })
  //       const data = await result.json()
  //       setEvents(data)
  //     } catch (err) {
  //       setGhError(err)
  //     }
  //   }
  //   fetchEvents()
  // }, [])
  //
  // useEffect(() => {
  //   //fetch user data
  //   const fetchLocations = async () => {
  //     const userLocations = await Promise.all(
  //       events.map(async (item) => {
  //         try {
  //           const result = await fetch(item.actor.url, {
  //             headers: {
  //               authorization: `token ${process.env.REACT_APP_GH_KEY}`
  //             }
  //           })
  //           const data = await result.json();
  //           return data
  //         } catch (err) {
  //           setIndividualError(err)
  //         }
  //     }))
  //
  //   //get locations from geosearch
  //     const places = userLocations.filter(loc => loc.location).map(loc => loc.location);
  //     const coords = await Promise.all(
  //       places.map(async place => {
  //         try {
  //           const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${process.env.REACT_APP_GEO_KEY}`)
  //           const data = await result.json();
  //           return {
  //             ...data.results[0].geometry,
  //           }
  //         } catch(err) {
  //           setGeoErrors([...geoErrors, `No coordinates for ${place}` ])
  //         }
  //       })
  //     )
  //     setLocations(coords)
  //   }
  //   fetchLocations();
  // }, [events])

  //test data
  // COMMENT THIS OUT WHEN USING FOR REAL
  useEffect(() => {
    setLocations([
      {lat: 40.745255, lng: -74.034775},
      {lat: 41.676388, lng: -86.250275},
      {lat: 33.038334, lng: -97.006111},
      {lat: 38.257778, lng: -122.054169},
      {lat: 34.257778, lng: 69.054169},
      {lat: -14.257778, lng: -70.054169},
      {lat: 55.257778, lng: 12.054169},
      {lat: 30.257778, lng: 31.054169},
    ])
  }, [])

  useEffect(() => {
    const markers = locations.filter(location => location !== undefined).map((location, index) => {
      return (
      <Circle
        className="circle-marker"
        key={index}
        center={[location.lat, location.lng]}
      >
      </Circle>
    )
    })
    setMarkers(markers)
  }, [locations])

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < markers.length) {
        setCurrentMarker(markers[index]);
        index++
      } else {
        clearInterval(timer)
      }
    }, 1300)
  }, [markers])

  return (
    <div className='github-activity-map-container'>
      { props.error && props.error }
      {!props.error &&
        <MapContainer center={[51.505, -0.09]} zoom={1.5} scrollWheelZoom={false} style={{height : '100%'}}>
          <TileLayer
            attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          {currentMarker && currentMarker}
        </MapContainer>
      }
    </div>
  )
}
export default GitHubActivityMap;
