import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import './DashPothole.css';

class DashPothole extends React.Component {
  state = {};

  render () {
    // {details} passed in via props, contains individual pothole object
    const {details} = this.props;
    // button click, takes user to a new route, based on the firebase id
    const clickSinglePothole = () => {
      this.props.history.push(`/pothole/${details.id}`);
    };

    return (
      <tr>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickSinglePothole}>
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            Full Record
          </button>
        </td>
        <td className='dash-pothole-mobile'>{details.status}</td>
        <td className='dash-pothole-mobile'>{details.createdDate}</td>
        <td className='dash-pothole-mobile'>{details.severity}</td>
        <td className='overflow-hidden'>
          {details.descriptionNotes}
        </td>
        <td className='dash-pothole-mobile'>{JSON.stringify(details.updated)}</td>
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
