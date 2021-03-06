/**
 *
 * Map
 *
 */

import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './mapMarker';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 52.927995,
      lng: -3.966119,
    },
    zoom: 9,
  };
  render() {
    const { markers } = this.props;
    const mappedMarkers = markers.map(m => ({
      lat: m.city.coord.lat,
      lng: m.city.coord.lon,
      key: m.city.id,
      icon: m.weather.weather[0].icon,
      description: m.weather.weather[0].description,
    }));

    return (
      // Important! Always set the container height explicitly
      <div
        style={{
          height: '100vh',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBDVf1xZEk_F_Txff2mFFCKlLVjFlN9S38' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {mappedMarkers.map(m => {
            const Marker = <MapMarker {...m} />;
            return Marker;
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {};

export default Map;
