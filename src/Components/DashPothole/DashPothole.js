import React from 'react';
import {withRouter} from 'react-router-dom';

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
        <td>{details.status}</td>
        <td>{details.createdDate}</td>
        <td>{details.severity}</td>
        <td className='overflow-hidden'>
          {details.descriptionNotes}
        </td>
        <td>{JSON.stringify(details.updated)}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickSinglePothole}>
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            Full Record
          </button>
        </td>
      </tr>
    );
  }
};

// withRouter was the key to fixing the clickSinglePothole function
export default withRouter(DashPothole);
