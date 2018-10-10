import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';

import Upvotes from '../Upvotes/Upvotes';

import './GenerateMarkers.css';

class GenerateMarkers extends React.Component {
  render () {
    const {details} = this.props; // Single pothole object
    const chooseColorIcon = () => {
      if (details.status === 'Newly Added') {
        return (
          new Icon({
            iconUrl: ('https://www.sandersbroscoffee.com/fix-that-pothole/red.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      } else if (details.status === 'Pothole Assigned') {
        return (
          new Icon({
            iconUrl: ('https://www.sandersbroscoffee.com/fix-that-pothole/purple.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      } else if (details.status === 'Pothole Fixed') {
        return (
          new Icon({
            iconUrl: ('https://www.sandersbroscoffee.com/fix-that-pothole/orange.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      } else {
        return (
          new Icon({
            iconUrl: ('https://www.sandersbroscoffee.com/fix-that-pothole/yellow.svg'),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
        );
      }
    };

    const markerIcon = chooseColorIcon();

    const clickSinglePothole = () => {
      this.props.history.push(`/pothole/${details.id}`);
    };

    //
    return (
      <Marker
        position={[(details.coordLat * 1), (details.coordLong * 1)]}
        riseOnHover={true}
        icon={markerIcon}>
        <Popup>
          <div className='single-marker-popup'>
            <p><span className='popup-label'>Status:</span> {details.status}</p>
            <p><span className='popup-label'>Severity:</span> {details.severity}</p>
            <p><span className='popup-label'>Created Date:</span> {details.createdDate}</p>
            <Upvotes
              details={details}
            ></Upvotes>
            <div className='popup-buttons col-xs-12'>
              <a href={`
                http://maps.google.com/maps?q=&layer=c&cbll=
                ${details.coordLat},
                ${details.coordLong}
              `} target="_blank">
                <button
                  type="button"
                  className="btn" >
                  <span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
                  Streetview
                </button>
              </a>
              <button
                type="button"
                className="btn"
                onClick={clickSinglePothole}>
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                Details
              </button>
            </div>
            {
              details.updated ?
                <p><span className='popup-label'>Last updated
                </span> {details.updatedDate}</p>
                : null
            }
            <p><span className='popup-label'>Notes:</span> {details.descriptionNotes}</p>
            <p><span className='popup-label'>Address:</span> {details.displayAddress}</p>
          </div>
        </Popup>
      </Marker>
    );
  }
};

GenerateMarkers.propTypes = {
  details: PropTypes.object.isRequired,
};

export default withRouter(GenerateMarkers);
