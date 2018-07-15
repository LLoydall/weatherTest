/**
 *
 * Map Marker
 *
 */
import React from 'react';

export default function MapMarker(props) {
  return (
    <div className="marker">
      <img
        src={`http://openweathermap.org/img/w/${props.icon}.png`}
        alt={props.description}
      />
    </div>
  );
}
