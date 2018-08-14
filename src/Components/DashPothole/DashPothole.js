import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import './DashPothole.css';

class DashPothole extends React.Component {
  state = {
    lat: 0,
    long: 0,
  };

  handleCoordinates = (a, b) => {
    this.setState({lat: a});
    this.setState({long: b});
  }

  render () {
    // {details} passed in via props, contains individual pothole object
    const {details} = this.props;
    // button click, takes user to a new route, based on the firebase id
    const clickSinglePothole = () => {
      this.props.history.push(`/pothole/${details.id}`);
    };

    const clickForMap = () => {
      this.props.theModalCoordinates(details.coordLat, details.coordLong);
    };

    return (
      <tr>
        <td>
          <button
            type="button"
            className="btn"
            onClick={clickSinglePothole}>
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            Full Record
          </button>
        </td>
        <td>
          <a href={`http://maps.google.com/maps?q=&layer=c&cbll=${details.coordLat},${details.coordLong}`} target="_blank">
            <button
              type="button"
              className="btn"
            >
              <span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
              Streetview
            </button>
          </a>
        </td>

        <td>
          <button
            type="button"
            className="btn"
            onClick={clickForMap}
            handleCoordinates={}
          >
            <span className="glyphicon glyphicon-screenshot" aria-hidden="true"></span>
            Map
          </button>
        </td>

        <td className='dash-pothole-mobile'>{details.status}</td>
        <td className='dash-pothole-mobile'>{details.createdDate}</td>
        <td className='dash-pothole-mobile'>{details.severity}</td>
        <td className='dash-pothole-mobile'>{JSON.stringify(details.updated)}</td>
        <td className='overflow-hidden'>
          {details.descriptionNotes}
        </td>
      </tr>
    );
  }
};

DashPothole.propTypes = {
  details: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

// withRouter was the key to fixing the clickSinglePothole function
export default withRouter(DashPothole);
