import React, { useEffect, useState } from 'react';
import './GitHubActivityMap.css';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'
import Legend from './Legend'
require('dotenv').config();


const GitHubActivityMap = (props) => {
  const [map, setMap] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [timer, setTimer] = useState(null);
  const [error, setError] = useState('');
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
      setError(err)
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
          setError(err)
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
          console.log('fetched')
          const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place.location}&key=${process.env.REACT_APP_GEO_KEY}`)
          const data = await result.json();
          const newPlace = {
            coordinates: {...data.results[0].geometry},
            eventType: place.eventType
          }
          return newPlace
        } catch(err) {
          setError(err)
        }
      })
    )
    return coordsAndTypes
  }

  const createMarkers = (coordsAndTypes) => {
    const circlePings = coordsAndTypes.filter(location => location !== undefined).map((location, index) => {
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
      setTimer(window.setInterval(() => {
        if (index < markers.length) {
          setCurrentMarker(markers[index]);
          index++
        } else {
          clearInterval(timer)
        }
      }, 1300))
    }
    startMap();
    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const handleMapClick = () => {
    console.log('clicked')
    setClicked(true);
  }

  return (
    <>
    {!clicked && <button onClick={handleMapClick}>Start demo!</button>}
    <div className='github-activity-map-container'>
      { error && <p>Oops we had an error</p> }
      {!props.error &&
        <MapContainer
          center={[0, 0]}
          zoom={1.6}
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
    </>
  )
}
export default GitHubActivityMap;
