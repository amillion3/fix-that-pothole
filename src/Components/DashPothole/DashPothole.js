import React from 'react';

import './DashPothole.css';

class DashPothole extends React.Component {

  render () {
    const {p} = this.props;
    return (
      <tr>
        <td>{p.status}</td>
        <td>{p.createdDate}</td>
        <td>{p.severity}</td>
        <td>{p.descriptionNotes}</td>
        <td>&#9783;</td>
      </tr>

    );
  }
};

export default DashPothole;
