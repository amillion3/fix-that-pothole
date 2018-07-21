import React from 'react';

import './DashPothole.css';

class DashPothole extends React.Component {

  render () {
    const {details} = this.props;
    return (
      <tr>
        <td>{details.status}</td>
        <td>{details.createdDate}</td>
        <td>{details.severity}</td>
        <td>{details.descriptionNotes}</td>
        <td>&#9783;</td>
      </tr>

    );
  }
};

export default DashPothole;
