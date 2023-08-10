import React, { useState, useEffect, useContext } from 'react';
import Map, {Marker} from 'react-map-gl';
import marker from "../../assets/logos/loc-check.png";
const ShowMap = (props) => {

const {latitude, longitude} = props;

return (
    <div className='map-outer-outer'>

<div className='map-outer'>
        {latitude && longitude ? <Map
        mapboxAccessToken="pk.eyJ1IjoiYXN1ciIsImEiOiJja3Q2ZXhkYW4waHJwMm5xbHVrZnE2YjZ2In0.pQ-92peoEdKmKFJAi6DoSg"
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 15
        }}
        className='map-window'
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
      <Marker
      longitude={longitude}
      latitude={latitude}>
      <div className="marker temporary-marker"><span></span></div>
      </Marker>
      
      </Map>: ""}
      </div>


    </div>
)
};

export default ShowMap;