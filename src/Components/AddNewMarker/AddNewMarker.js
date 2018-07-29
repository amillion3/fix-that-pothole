import React from 'react';
import {Popup} from 'react-leaflet';

class AddNewMarker extends React.Component {
  render () {
    const {details} = this.props;

    return (
      <Popup>
        <p><strong>Status: </strong>{details.status}</p>
        <p><strong>Severity: </strong>{details.severity}</p>
        <p><strong>Created Date: </strong>{details.createdDate}</p>
        <p><strong>Updated ? </strong>{details.updated}</p>
        <p><strong>Notes: </strong>{details.descriptionNotes}</p>
      </Popup>
    );
  }
};

export default AddNewMarker;
