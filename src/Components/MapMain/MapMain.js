import React, { createRef, Component} from 'react';
import {Link} from 'react-router-dom';
import { Map, TileLayer} from 'react-leaflet';

import GenerateMarkers from '../GenerateMarkers/GenerateMarkers';
import Alerts from '../Alerts/Alerts';
import ModalAddPothole from '../ModalAddPothole/ModalAddPothole';

import potholeRequests from '../../firebaseRequests/potholeRequests';
import auth from '../../firebaseRequests/auth';
import constants from '../../constants';

import './MapMain.css';
class MapMain extends Component {
  constructor (props) {
    super (props);
    this.state = {
      potholes: [],
      hasLocation: false,
      latlng: {
        lat: '',
        lng: '' },
      tempPothole: {},
      canAddPoint: false,
      style: {cursor: 'default'},
      customNashville: '',
      showModal: false,
      showAlert: false,
    };
  }

  showModal = () => this.setState({ showModal: true });
  hideModal = () => this.setState({ showModal: false });

  // Can user add a new point by clicking on the map?
  addPointTrue = () => {
    this.setState({canAddPoint: true});
    this.setState({style: {cursor: 'crosshair'}});
  };
  addPointFalse = () => {
    this.setState({canAddPoint: false});
    this.setState({style: {cursor: 'default'}});
  };

  componentWillMount () {
    potholeRequests
      .potholesGETAll()
      .then(potholes => {
        const {customNashville} = constants;
        this.setState({customNashville});
        this.setState({potholes});
        // this.setState({potholes: potholes});  ES5 long form
      })
      .catch(err => console.error('Error with pothole get request: ', err));
  }

  mapRef = createRef();

  handleClick = e => {
    if (this.state.canAddPoint) {
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
      potholeToAdd.updatedDate = '';
      potholeToAdd.updatedUserId = '';
      potholeToAdd.updatedTime = '';
      potholeToAdd.id = Math.random();
      this.showModal();
      this.addPointFalse();
      this.setState({tempPothole: potholeToAdd});
    }
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
  }

  eventAddNewPothole = e => {
    this.addPointTrue(); // user CAN add points now
  };

  onDismiss = () => {
    this.setState({showAlert: false});
  }
  onSaveModal = () => {
    potholeRequests
      .potholesGETAll()
      .then(potholes => {
        this.setState({potholes});
      })
      .catch(err => console.error('Error with pothole get request after save: ', err));
    this.setState({showAlert: true});
    this.setState({showModal: false});
    this.addPointFalse();
  }
  onCancelModal = () => {
    this.setState({showModal: false});
    this.addPointFalse();
  }

  render () {
    const potholeComponents = this.state.potholes.map(pothole => {
      return (
        <GenerateMarkers
          details={pothole}
          key={pothole.id} />
      );
    });
    return (
      <div className='map-container'>
        <ModalAddPothole
          showModal={this.state.showModal}
          tempPothole={this.state.tempPothole}
          onSave={this.onSaveModal}
          onCancel={this.onCancelModal}
        ></ModalAddPothole>
        <Alerts
          alertText="Pothole record saved."
          showAlert={this.state.showAlert}
          onDismiss={this.onDismiss}
          bsStyle="success" />
        <Map
          center={[36.1491592, -86.7703593]}
          zoom={15}
          length={4}
          ref={this.mapRef}
          onLocationfound={this.handleLocationFound}
          id="Map"
          className='mappityMap'
          onClick={this.handleClick}
          style={this.state.style}>
          <TileLayer
            url={this.state.customNashville}/>
          <div className="">
            {potholeComponents}
          </div>
        </Map>
        <div className='col-xs-12 menu-items'>
          <button
            className = 'col-xs-5 btn btn-large btn-warning menu-items-btn'
            onClick={this.eventAddNewPothole}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"> </span>
              Add New Pothole
          </button>
          <Link to='/dashboard'>
            <button
              className = 'col-xs-5 col-xs-offset-2 btn btn-large btn-info menu-items-btn'
              onClick={this.eventDashboard}>
              <span className="glyphicon glyphicon-th-list" aria-hidden="true"> </span>
               View Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default MapMain;
