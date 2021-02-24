import React, { useEffect, useState } from 'react';
import './GitHubActivityMap.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const GitHubActivityMap = (props) => {

  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [markers, setMarkers] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      const result = await fetch('https://api.github.com/events', {
        headers: {
          authorization: "token a28d7e80e53dee17c87b109f37a23b3f2f3d3337"
        }
      })
      const data = await result.json()
      setEvents(data)
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    //fetch user data
    const fetchLocations = async () => {
      const userLocations = await Promise.all(
        events.map(async (item) => {
          const result = await fetch(item.actor.url, {
            headers: {
              authorization: "token a28d7e80e53dee17c87b109f37a23b3f2f3d3337"
            }
          })
        const data = await result.json();
        return data
      }))

    //get locations
      const places = userLocations.filter(loc => loc.location).map(loc => loc.location);
      const coords = await Promise.all(
        places.map(async place => {
          try {
            const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=e0b4a3f2213247859e55897af976da36`)
            const data = await result.json();
            return data.results[0].geometry
          } catch(e) {
            console.log(`No coordinates for ${place}`)
          }
        })
      )
      setLocations(coords)
    }
    fetchLocations();
  }, [events])


  return (
    <div className='github-activity-map-container'>
      { props.error && props.error }
      {!props.error &&
        <MapContainer center={[51.505, -0.09]} zoom={1.5} scrollWheelZoom={false} style={{height : '100%'}}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.length && markers}
        </MapContainer>
      }
    </div>
  )
}
export default GitHubActivityMap;
