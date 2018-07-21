import React from 'react';

import DashModal from '../DashModal/DashModal';

import './DashPothole.css';

class DashPothole extends React.Component {

  render () {
    const {details} = this.props;
    const openModalSinglePothole = e => {
      console.error('details', details.id);
      return (
        <DashModal
          firebaseId={details.id}
          details={details}
        />
      );
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
            onClick={openModalSinglePothole}
          >
            click
          </button>
          &#9783;</td>
      </tr>

    );
  }
};

export default DashPothole;
