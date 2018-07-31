import React from 'react';
import {withRouter} from 'react-router-dom';

import './DashPothole.css';

class DashPothole extends React.Component {
  state = {};
  render () {
    const {details} = this.props;
    // const p = this.state;
    const clickSinglePothole = () => {
      this.props.history.push(`/pothole/${details.id}`);
    };

    return (
      <tr>
        <td>{details.status}</td>
        <td>{details.createdDate}</td>
        <td>{details.severity}</td>
        <td className='overflow-hidden'>    {details.descriptionNotes}</td>
        <td>{JSON.stringify(details.updated)}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickSinglePothole}>
            Full Record
          </button>
        </td>
      </tr>
    );
  }
};

export default withRouter(DashPothole);
