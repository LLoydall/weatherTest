/**
 *
 * Map Marker
 *
 */
import { React } from 'react';

export default props => (
  <div className="marker">
    <img
      src={`http://openweathermap.org/img/w/${props.icon}.png`}
      alt={props.description}
    />
  </div>
);
