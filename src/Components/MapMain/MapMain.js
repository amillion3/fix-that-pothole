import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import GenerateMarkers from '../GenerateMarkers/GenerateMarkers';
import MenuItemAddPothole from '../MenuItemAddPothole/MenuItemAddPothole';
import potholeRequests from '../../firebaseRequests/potholeRequests';
// import {getGeoJsonObject} from '../../helperFunctions/getGeoJsonObject';
// import auth from '../../firebaseRequests/auth';

import './MapMain.css';

class MapMain extends Component {
  constructor (props) {
    super (props);
    // Don't call this.setState() here!
    this.state = {
      potholes: [],
      hasLocation: false,
      latlng: {
        lat: 36.1643083,
        lng: -86.7973366,
      },
    };
  }

  componentWillMount () {
    potholeRequests
      .potholesGETAll()
      .then(potholes => {
        this.setState({potholes: potholes});
        // this.setState({potholes});  ES6 shorthand
      })
      .catch(err => {
        console.error('Error with pothole GET request ', err);
      });
  }

  mapRef = createRef();

  handleClick = e => {
    this.mapRef.current.leafletElement.locate();

    // console.log(e);
    const tempPothole = {};
    tempPothole.coordLat = e.latlng.lat;
    tempPothole.coordLong = e.latlng.lng;
    tempPothole.isComplete = false;
    // need to gather more attributes here
    const {potholes} = this.state;
    potholes.push(tempPothole);
    // console.log(tempPothole);
    // Display modal/Popup
    // Display for for user input
    // If user clicks 'Save' then POST to firebase
    //   if POST is good, then reload all potholes to state

  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
    console.log('THIS.STATE', this.state);
  }

  render () {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>
          <span>You are here</span>
        </Popup>
      </Marker>
    ) : null;
    const potholeComponents = this.state.potholes.map(pothole => {
      return (
        <GenerateMarkers
          details={pothole}
          key={pothole.id}
        />
      );
    });
    return (
      <div className='map-container'>
        <Map
          center={[36.1491592, -86.7703593]}
          zoom={10}
          length={4}
          ref={this.mapRef}
          onLocationfound={this.handleLocationFound}
          className='mappityMap'
          onClick={this.handleClick}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          <div className="">
            {potholeComponents}
          </div>
          {marker}
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
