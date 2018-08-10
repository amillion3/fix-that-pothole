import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';

import './GenerateMarkers.css';

class GenerateMarkers extends React.Component {
  render () {
    const {details} = this.props; // Single pothole object
    console.log(details);
    const chooseColorIcon = () => {
      if (details.status === 'Newly Added') {
        return (
          new Icon({
            iconUrl: ('https://www.andymillion.com/fix-that-pothole/red.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      } else if (details.status === 'Pothole Assigned') {
        return (
          new Icon({
            iconUrl: ('https://www.andymillion.com/fix-that-pothole/purple.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      } else if (details.status === 'Pothole Fixed') {
        return (
          new Icon({
            iconUrl: ('https://www.andymillion.com/fix-that-pothole/orange.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      } else {
        return (
          new Icon({
            iconUrl: ('https://www.andymillion.com/fix-that-pothole/yellow.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      }
    };

    const markerIcon = chooseColorIcon();
    //
    return (
      <Marker
        position={[(details.coordLat * 1), (details.coordLong * 1)]}
        riseOnHover={true}
        icon={markerIcon}>
        <Popup>
          <div className='single-marker-popup'>
            <p><strong>Status: </strong>{details.status}</p>
            <p><strong>Severity: </strong>{details.severity}</p>
            <p><strong>Created Date: </strong>{details.createdDate}</p>
            {
              details.updated ?
                <p><strong>Last updated </strong>{details.updatedDate}</p>
                : null
            }
            <p><strong>Notes: </strong>{details.descriptionNotes}</p>
          </div>
        </Popup>
      </Marker>
    );
  }
};

GenerateMarkers.propTypes = {
  details: PropTypes.object.isRequired,
};

export default GenerateMarkers;
