import React from 'react';
import { Marker, Popup} from 'react-leaflet';

class GenerateMarkers extends React.Component {
  render () {
    const {details} = this.props;

    return (
      <Marker
        position={[(details.coordLat * 1), (details.coordLong * 1)]}>
        <Popup>
          <p><strong>Status: </strong>{details.status}</p>
          <p><strong>Severity: </strong>{details.severity}</p>
          <p><strong>Created Date: </strong>{details.createdDate}</p>
          <p><strong>Updated ? </strong>{details.updated}</p>
          <p><strong>Notes: </strong>{details.descriptionNotes}</p>
        </Popup>
      </Marker>
    );
  }
};

export default GenerateMarkers;