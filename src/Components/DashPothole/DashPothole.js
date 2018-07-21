import React from 'react';
import {withRouter} from 'react-router-dom';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './DashPothole.css';

class DashPothole extends React.Component {
  state = {};
  render () {
    const {details} = this.props;
    const clickSinglePothole = () => {
      potholeRequests
        .potholeGETSingle(details.id)
        .then(response => {
          this.setState(response);
        })
        .then(response => {
          console.error('details.id', details.id);
          this.props.history.push(`/pothole/${details.id}`);
        }
        )
        .catch(err => {
          console.error(err);
        });
    };

    return (
      <tr>
        <td>{details.status}</td>
        <td>{details.createdDate}</td>
        <td>{details.severity}</td>
        <td>{details.descriptionNotes}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickSinglePothole}

          >
            click
          </button>
          &#9783;</td>
      </tr>

    );
  }
};

export default withRouter(DashPothole);
