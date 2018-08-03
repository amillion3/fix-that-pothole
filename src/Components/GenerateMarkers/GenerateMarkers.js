import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';

import './GenerateMarkers.css';

class GenerateMarkers extends React.Component {
  render () {
    const {details} = this.props; // Single pothole object
    // https://leafletjs.com/reference-1.3.2.html#icon
    const redMarker = new Icon({
      iconUrl: ('https://www.andymillion.com/fix-that-pothole/marker-red.png'),
      iconSize: [32, 32],
    });
    return (
      <Marker
        position={[(details.coordLat * 1), (details.coordLong * 1)]}
        riseOnHover={true}
        icon={redMarker}>
        <Popup>
          <p><strong>Status: </strong>{details.status}</p>
          <p><strong>Severity: </strong>{details.severity}</p>
          <p><strong>Created Date: </strong>{details.createdDate}</p>
          <p><strong>Updated ? </strong>{JSON.stringify(details.updated)}</p>
          <p><strong>Notes: </strong>{details.descriptionNotes}</p>
        </Popup>
      </Marker>
    );
  }
};

GenerateMarkers.propTypes = {
  details: PropTypes.object.isRequired,
};

export default GenerateMarkers;
