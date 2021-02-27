import React, { useEffect, useState } from 'react';
import './GitHubActivityMap.css';
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'
import Legend from './Legend.js'
const dotEnv = require('dotenv').config();


const GitHubActivityMap = (props) => {
  const [map, setMap] = useState(null);
  const [ghError, setGhError] = useState('');
  const [individualError, setIndividualError] = useState('');
  const [geoErrors, setGeoErrors] = useState([]);
  const [currentMarker, setCurrentMarker] = useState('');

  const colorKey = {
    PushEvent: 'red',
    CreateEvent: 'orange',
    PublicEvent: 'blue',
    WatchEvent: 'green',
    IssueCommentEvent: 'purple',
    PullRequestEvent: 'cornflowerblue'
  }

  const fetchEvents = async () => {
    try {
      //?per_page=100
      const result = await fetch('https://api.github.com/events', {
        headers: {
          authorization: `token ${process.env.REACT_APP_GH_KEY}`
        }
      })
      const events = await result.json()
      return events
    } catch (err) {
      setGhError(err)
    }
  }

  const fetchUserProfiles = async (events) => {
    const userProfiles = await Promise.all(
      events.map(async (item) => {
        try {
          const result = await fetch(item.actor.url, {
            headers: {
              authorization: `token ${process.env.REACT_APP_GH_KEY}`
            }
          })
          const data = await result.json();
          return { userData: data, eventType: item.type }
        } catch (err) {
          setIndividualError(err)
        }
    }))
    return userProfiles
  }

  const fetchUserLocations = async (users) => {
    const places = users.filter(profile => profile.userData.location)
      .map(profile => ({ location: profile.userData.location, eventType: profile.eventType }));

    const coordsAndTypes = await Promise.all(
      places.map(async place => {
        try {
          const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place.location}&key=${process.env.REACT_APP_GEO_KEY}`)
          const data = await result.json();
          const newPlace = {
            coordinates: {...data.results[0].geometry},
            eventType: place.eventType
          }
          return newPlace
        } catch(err) {
          setGeoErrors([...geoErrors, `No coordinates for ${place.location}` ])
        }
      })
    )
    return coordsAndTypes
  }

  const createMarkers = (coordsAndTypes) => {
    const circlePings = coordsAndTypes.filter(location => location.coordinates !== undefined).map((location, index) => {
      return (
      <Circle
        className="circle-marker"
        key={index}
        center={[location.coordinates.lat, location.coordinates.lng]}
        color={colorKey[location.eventType] || 'white'}
      >
      </Circle>
    )
    })
    return circlePings
  }

  useEffect(() => {
    const startMap = async () => {
      const fetchedEvents = await fetchEvents();
      const fetchedUserProfiles = await fetchUserProfiles(fetchedEvents);
      const coordsAndTypes = await fetchUserLocations(fetchedUserProfiles);
      const markers = createMarkers(coordsAndTypes)
      let index = 0;
      const timer = setInterval(() => {
        if (index < markers.length) {
          setCurrentMarker(markers[index]);
          index++
        } else {
          clearInterval(timer)
        }
      }, 1300)
      return (timer) => {
        clearInterval(timer)
      }
    }

    startMap();
  }, [])

  //test data
  // COMMENT THIS OUT WHEN USING FOR REAL
  // useEffect(() => {
  //   setLocations([
  //     {lat: 40.745255, lng: -74.034775},
  //     {lat: 41.676388, lng: -86.250275},
  //     {lat: 33.038334, lng: -97.006111},
  //     {lat: 38.257778, lng: -122.054169},
  //     {lat: 34.257778, lng: 69.054169},
  //     {lat: -14.257778, lng: -70.054169},
  //     {lat: 55.257778, lng: 12.054169},
  //     {lat: 30.257778, lng: 31.054169},
  //   ])
  // }, [])

  return (
    <div className='github-activity-map-container'>
      { props.error && props.error }
      {!props.error &&
        <MapContainer
          center={[51.505, -0.09]}
          zoom={1.5}
          scrollWheelZoom={false}
          style={{height : '100%'}}
          whenCreated={setMap}>
          <TileLayer
            attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          {currentMarker && currentMarker}
          {map && <Legend map={map}/>}
        </MapContainer>
      }
    </div>
  )
}
export default GitHubActivityMap;
