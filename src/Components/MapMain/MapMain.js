import React from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

import MenuItemAddPothole from '../MenuItemAddPothole/MenuItemAddPothole';
import {getGeoJsonObject} from '../../helperFunctions/getGeoJsonObject';
// import auth from '../../firebaseRequests/auth';

import './MapMain.css';

const theGeoJson =
{"type": "FeatureCollection",
  "features": [
    {"type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [0, 0]
      },
      "properties": {
        "createdBy": "",
        "createdDate": "",
        "status": "",
        "severity": "",
        "descriptionNotes": "",
        "updated": "",
        "updatedUserId": "",
        "updatedDate": ""
      }
    }
  ]
};

class MapMain extends React.Component {
  constructor (props) {
    super (props);
    // Don't call this.setState() here!
    this.state = { theGeoJson };
  }

  state = {
    coordLat: '',
    coordLong: '',
    createdBy: '',
    createdDate: '',
    descriptionNotes: '',
    itemId: '',
    severity: '',
    status: '',
    updated: false,
    updatedDate: '',
    updatedUserId: '',
  }
  ComponentDidMount () {
    console.log('console did mount');
    this.setState(getGeoJsonObject());
  }

  render () {

    const position = [36.1491592, -86.7703593];
    return (

      <div className='map-container'>
        <Map center={position} zoom={15} className='mappityMap'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A hard coded marker. <br /> Easily customizable.
            </Popup>
          </Marker>
          <GeoJSON
            data={theGeoJson} />
        </Map>
        <MenuItemAddPothole />
      </div>

    );
  }

  // const handleClick = e => {

  // this.setState({
  //   coordLat: convertedCoordinates[1],
  //   coordLong: convertedCoordinates[0],
  //   createdBy: auth.fbGetUid(),
  //   createdDate: new Date().toLocaleDateString('en-US'),
  //   descriptionNotes: '',
  //   itemId: '',
  //   severity: '',
  //   status: 'Newly added',
  //   updated: false,
  //   updatedDate: '',
  //   updatedUserId: '',
  // });

  // 1. call a modal to enter attributes?
  // might need to expand state to capture these
  // 2. will need to capture all attributes and
  // send to firebase and then
  // 3. setState to default
  // 4. after each point is created, make sure that
  // the 'digitize point' on next mouse click goes
  // away. I want the user to have to click the
  // 'Add Point' button before adding another
};

export default MapMain;
