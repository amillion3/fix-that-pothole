import React, { createRef, Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import {Modal, Button} from 'react-bootstrap';

import GenerateMarkers from '../GenerateMarkers/GenerateMarkers';
import MenuItemAddPothole from '../MenuItemAddPothole/MenuItemAddPothole';
import potholeRequests from '../../firebaseRequests/potholeRequests';
import auth from '../../firebaseRequests/auth';

import './MapMain.css';
// Display modal/Popup
// Display for for user input
// If user clicks 'Save' then POST to firebase
//   if POST is good, then reload all potholes to state
class MapMain extends Component {
  constructor (props) {
    super (props);
    // Don't call this.setState() here!
    this.state = {
      potholes: [],
      hasLocation: false,
      latlng: {
        lat: '',
        lng: '',
      },
      tempPothole: {},
      show: false,
    };
  }

  showModal = () => this.setState({ show: true });
  hideModal = () => this.setState({ show: false });

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
    const potholeToAdd = {};
    potholeToAdd.isComplete = false;
    potholeToAdd.status = "Newly Added";
    potholeToAdd.coordLat = e.latlng.lat;
    potholeToAdd.coordLong = e.latlng.lng;
    potholeToAdd.createdDate = new Date().toLocaleDateString('en-US');
    potholeToAdd.createdBy = auth.fbGetUid();
    potholeToAdd.descriptionNotes = '';
    potholeToAdd.updated = false;
    this.setState({tempPothole: potholeToAdd});
    this.showModal();
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
    console.log('THIS.STATE', this.state);
  }

  modalBtnCancel = () => {
    this.hideModal();
    console.log('cancel');

  };
  modalBtnSave = () => {
    this.hideModal();
    console.log('save');
    potholeRequests
      .potholePOST(this.state.tempPothole)
      .then(() => {
        console.log('saved');
        alert('saved');
      })
      .catch(err => console.error('Error during save', err));
  };

  changeSeverity = e => {
    // this.setState({severity: e.target.value});
    // this.setState({tempPothole.severity: e.target.value});
    const tempVal = {...this.state.tempPothole};
    tempVal.severity = e.target.value;
    this.setState({tempPothole: tempVal});
  };
  // emailChange = e => {
  //   const tempUser = { ...this.state.user };
  //   tempUser.email = e.target.value;
  //   this.setState({ user: tempUser });
  // };
  changeDescriptionNotes = e => {
    const tempVal = {...this.state.tempPothole};
    tempVal.descriptionNotes = e.target.value;
    this.setState({tempPothole: tempVal});
  };

  render () {
    const {tempPothole} = this.state;
    const potholeComponents = this.state.potholes.map(pothole => {
      return (
        <GenerateMarkers
          details={pothole}
          key={pothole.id} />
      );
    });
    return (
      <div className='map-container'>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Pothole</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="">
              <div>
                <label>Severity:</label><br/>
                <select value={this.state.tempPothole.severity} onChange={this.changeSeverity}>
                  <option value="Low" onChange={this.changeSeverity}>Low</option>
                  <option value="Moderate" onChange={this.changeSeverity}>Moderate</option>
                  <option value="Severe" onChange={this.changeSeverity}>Severe</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="descriptionNotes">Notes:</label>
                <input
                  type="text"
                  className="form-control"
                  id="descriptionNotes"
                  value={tempPothole.descriptionNotes}
                  onChange={this.changeDescriptionNotes}/>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-primary' onClick={this.modalBtnSave}>Save This Pothole</Button>
            <Button className='btn btn-danger' onClick={this.modalBtnCancel}>Cancel and Clear</Button>
          </Modal.Footer>
        </Modal>
        <Map
          center={[36.1491592, -86.7703593]}
          zoom={10}
          length={4}
          ref={this.mapRef}
          onLocationfound={this.handleLocationFound}
          className='mappityMap'
          onClick={this.handleClick}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          <div className="">
            {potholeComponents}
          </div>
        </Map>
        <MenuItemAddPothole />
      </div>
    );
  }

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
