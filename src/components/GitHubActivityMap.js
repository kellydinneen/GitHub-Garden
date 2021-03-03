import React, { useEffect, useState } from 'react';
import './GitHubActivityMap.css';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'
import Legend from './Legend'
require('dotenv').config();


const GitHubActivityMap = (props) => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentMarker, setCurrentMarker] = useState('');
  const [geoError, setGeoError] = useState('')


  const colorKey = {
    PushEvent: '#FF8C00',
    CreateEvent: '#00BFFF',
    PublicEvent: '#00FF00',
    WatchEvent: '#FF00FF',
    IssueCommentEvent: '#6495ED',
    PullRequestEvent: '#FFFF54'
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
          const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place.location}&key=${process.env.REACT_APP_GEO_KEY}`)
          const data = await result.json();
          const newPlace = {
            coordinates: {...data.results[0].geometry},
            eventType: place.eventType
          }
          return newPlace
        } catch(err) {
          setGeoError(err)
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
    let timer;
    const startMap = async () => {
      const fetchedEvents = await fetchEvents();
      if (fetchedEvents) {
        const fetchedUserProfiles = await fetchUserProfiles(fetchedEvents);
        const coordsAndTypes = await fetchUserLocations(fetchedUserProfiles);
        const markers = createMarkers(coordsAndTypes);
        setIsLoaded(true);
        let index = 0;
        timer = window.setInterval(() => {
          if (index < markers.length) {
            setCurrentMarker(markers[index]);
            index++
          } else {
            clearInterval(timer)
          }
        }, 1300)
      }
    }
    startMap();
    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <>
    {!isLoaded && !error && <div className="map-loader"></div>}
    {isLoaded && <p className="map-description"> Real Time GitHub Events happening across the globe!</p>}
    <div className='github-activity-map-container'>
      {error && <p className="error-text">Oops! Something went wrong.</p> }
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
      <div className="bottom-buffer">
      </div>
    </div>
    </>
  )
}

export default GitHubActivityMap;
