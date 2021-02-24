import React from 'react';
import './GitHubActivityMap.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const GitHubActivityMap = (props) => {

  //d3 and leaflet stuff

  return (
    <div className='github-activity-map-container'>
      { props.error && props.error }
      {!props.error &&
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height : '100%'}}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      }
    </div>
  )
}
export default GitHubActivityMap;
