import React from 'react';
import { Marker, Popup} from 'react-leaflet';

class GenerateMarkers extends React.Component {
  state = {};
  render () {
    const {details} = this.props;

    return (
      <Marker
        position={[details.coordLong, details.coordLat]}>
        <Popup>
          {details.descriptionNotes}
        </Popup>
      </Marker>
    );
  }
};

export default GenerateMarkers;
