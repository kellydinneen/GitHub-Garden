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
