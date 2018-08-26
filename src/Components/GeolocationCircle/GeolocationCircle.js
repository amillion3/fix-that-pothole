import React from 'react';
import {Circle} from 'leaflet';

import './GeolocationCircle.css';

class GeolocationCircle extends React.Component {
  render () {
    const {circleLat, circleLng} = this.props;
    const LatLng = [circleLat, circleLng];
    return (
      new Circle(LatLng, 15)
    );
  }
}

export default GeolocationCircle;
