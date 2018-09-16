import React, { createRef} from 'react';
import { Map, TileLayer, Circle } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {FormGroup, Checkbox} from 'react-bootstrap';
import {stack as LeftMenu} from 'react-burger-menu';
import {stack as RightMenu} from 'react-burger-menu';

import GenerateMarkers from '../GenerateMarkers/GenerateMarkers';
import Alerts from '../Alerts/Alerts';
import AlertGeolocation from '../AlertGeolocation/AlertGeolocation';
import ModalAddPothole from '../ModalAddPothole/ModalAddPothole';
import Legend from '../Legend/Legend';

import potholeRequests from '../../firebaseRequests/potholeRequests';
import reverseGeocoding from '../geocodingRequests/reverseGeocoding';
import auth from '../../firebaseRequests/auth';
import constants from '../../constants';

import './MapMain.css';
require('react-leaflet-markercluster/dist/styles.min.css');
class MapMain extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      mapCenterLat: 36.1581592,
      mapCenterLng: -86.7703593,
      mapZoom: 15,
      circleLat: 0,
      circleLng: 0,
      circleRad: 0,
      potholes: [],
      isLeftMenuOpen: false,
      isRightMenuOpen: false,
      hasLocation: false,
      latlng: {
        lat: '',
        lng: '' },
      tempPothole: {},
      basemap: '',
      collectedZoomLevel: 0,
      collectedGeolocation: false,
      canAddPoint: false,
      style: {cursor: 'default'},
      showModal: false,
      showAlert: false,
      showGeolocationAlert: false,
      showLegend: false,
      showStreet: false,
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
    this.setState({
      canAddPoint: false,
      style: {cursor: 'default'},
    });
  };

  componentWillMount () {
    potholeRequests
      .potholesGETAll()
      .then(potholes => {
        const {customNashville} = constants;
        this.setState({
          basemap: customNashville,
          potholes,
          // this.setState({potholes: potholes});  ES5 long form
        });
      })
      .catch(err => console.error('Error with pothole get request: ', err));
  }

  mapRef = createRef();

  handleClick = e => {
    if (this.state.canAddPoint) {
      this.mapRef.current.leafletElement.locate();
      const potholeToAdd = {};
      reverseGeocoding
        .getMailingAddress(e.latlng.lat, e.latlng.lng)
        .then(incomingData => {
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
          potholeToAdd.collectedBasemap = this.state.basemap;
          potholeToAdd.collectedZoomLevel = e.target._zoom;
          potholeToAdd.collectedGeolocation = this.state.collectedGeolocation;
          potholeToAdd.displayAddress = incomingData;
          this.setState({tempPothole: potholeToAdd});
        })
        .then(() => {
          setTimeout(200);
          this.addPointFalse();
          this.showModal();
        });
    }
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
  }

  eventAddNewPothole = () => {
    this.addPointTrue(); // user CAN add points now
    this.setState({
      isLeftMenuOpen: false,
      isRightMenuOpen: false,
    });
  };

  onCancelModalLegend = () => {
    this.setState({showLegend: false});
  }

  eventLegend = e => {
    e.preventDefault();
    this.setState({showLegend: true});
  }
  // takes lat/long and updates the state (the map center)
  showPosition = position => {
    const accuracy = position.coords.accuracy;
    let zoomBasedOnAccuracy = 19;
    if (accuracy <= 40) {
      zoomBasedOnAccuracy = 20;
    } else if (accuracy <= 80) {
      zoomBasedOnAccuracy = 19;
    } else if (accuracy <= 150) {
      zoomBasedOnAccuracy = 18;
    } else if (accuracy <= 220) {
      zoomBasedOnAccuracy = 17.5;
    } else if (accuracy <= 400) {
      zoomBasedOnAccuracy = 17;
    } else if (accuracy <= 600) {
      zoomBasedOnAccuracy = 16.5;
    } else if (accuracy <= 800) {
      zoomBasedOnAccuracy = 16;
    } else if (accuracy <= 1000) {
      zoomBasedOnAccuracy = 15.5;
    } else {
      zoomBasedOnAccuracy = 15;
    }

    this.setState({
      mapCenterLat: position.coords.latitude,
      mapCenterLng: position.coords.longitude,
      mapZoom: zoomBasedOnAccuracy,
      circleLat: position.coords.latitude,
      circleLng: position.coords.longitude,
      circleRad: position.coords.accuracy,
    });
  };
  eventAddViaGeolocation = () => {
    if ("geolocation" in navigator) {
      // check if geolocation enabled
      navigator.geolocation.getCurrentPosition(position => {
        this.basemapSatelliteStreets();
        this.addPointTrue();
        this.setState({
          collectedGeolocation: true,
          showGeolocationAlert: true,
          isLeftMenuOpen: false,
        });
        this.showPosition(position);
      },
      function error (err) {
        // geolocation error(s)
        console.error('An error has occured while retrieving location', err);
      }
      );
    } else {
      // geolocation is not supported
      // get your location some other way
      console.log('Geolocation is not enabled on this browser');
    }
  };

  onDismiss = () => {
    this.setState({
      showAlert: false,
      showGeolocationAlert: false,
    });
  }
  onSaveModal = () => {
    potholeRequests
      .potholesGETAll()
      .then(potholes => {
        this.setState({potholes});
      })
      .catch(err => console.error('Error with pothole get request after save: ', err));
    this.addPointFalse();
    this.setState({
      showAlert: true,
      showModal: false,
      circleLat: 0,
      circleLng: 0,
      collectedGeolocation: false,
    });
  }
  onCancelModal = () => {
    this.addPointFalse();
    this.setState({
      showModal: false,
      circleLat: 0,
      circleLng: 0,
      collectedGeolocation: false,
    });
  }

  // These control the basemaps used
  basemapNashville = () => {
    if (this.state.canAddPoint === false) {
      const {customNashville} = constants;
      this.setState({basemap: customNashville});
    }
  }
  basemapStreets = () => {
    if (this.state.canAddPoint === false) {
      const {customStreets} = constants;
      this.setState({basemap: customStreets});
    }
  }
  basemapSatelliteStreets = () => {
    if (this.state.canAddPoint === false) {
      const {customSatelliteStreets} = constants;
      this.setState({basemap: customSatelliteStreets});
    }
  }

  openLeftMenu = () => {
    this.setState({
      isLeftMenuOpen: true,
      isRightMenuOpen: false,
    });
    return this.state.isLeftMenuOpen;
  }

  openRightMenu = () => {
    this.setState({
      isRightMenuOpen: true,
      isLeftMenuOpen: false,
    });
    return this.state.isRightMenuOpen;
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
        <LeftMenu
          isOpen={this.state.isLeftMenuOpen}
          customBurgerIcon={ false }
          customCrossIcon={ false }
          width={'250px'}
        >
          <div className='col-xs-12 menu-items'>
            <button
              type="button"
              className = 'col-xs-12 btn menu-items-btn'
              id="btn-add-pothole"
              onMouseUp={this.eventAddNewPothole}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"> </span>
                Add New Pothole
            </button>
            <button
              type="button"
              className = 'col-xs-12 btn menu-items-btn'
              id="btn-add-pothole"
              onMouseUp={this.eventAddViaGeolocation}>
              <span className="glyphicon glyphicon-globe" aria-hidden="true"> </span>
                Use My Location
            </button>
            <FormGroup
              className='left-menu-checkbox'
            >
              <h4 className='text-center left-menu-checkbox'>Filter Results:</h4>
              <Checkbox
                checked={this.filterCheckbox1}
              >Newly Added</Checkbox>
              <Checkbox
                checked={this.filterCheckbox2}
              >Pothole Assigned</Checkbox>
              <Checkbox
                checked={this.filterCheckbox3}
              >Pothole Fixed</Checkbox>
              <Checkbox
                checked={this.filterCheckbox4}
              >Problem With Repair</Checkbox>
            </FormGroup>
            <img className='menu-icon'src='https://www.sandersbroscoffee.com/fix-that-pothole/blackArrow.png' alt='icon' />
          </div>
        </LeftMenu>
        <RightMenu
          isOpen={this.state.isRightMenuOpen}
          right
          customBurgerIcon={ false }
          customCrossIcon={ false }
          width={'250px'}
        >
          <Legend></Legend>
          <img className='menu-icon page-footer'src='https://www.sandersbroscoffee.com/fix-that-pothole/blackArrow.png' alt='icon' />
        </RightMenu>
        <ModalAddPothole
          showModal={this.state.showModal}
          tempPothole={this.state.tempPothole}
          onSaveModal={this.onSaveModal}
          onCancelModal={this.onCancelModal}
        ></ModalAddPothole>
        <Alerts
          alertText="Pothole record saved."
          showAlert={this.state.showAlert}
          onDismiss={this.onDismiss}
          bsStyle="success"
          className='alert-fade' />
        <AlertGeolocation
          alertText="Geolocation enabled. After the map zooms to your location, please click/tap on the map to identify the pothole."
          showAlert={this.state.showGeolocationAlert}
          onDismiss={this.onDismiss}
          bsStyle="warning"
          className='alert-fade' />
        <Map
          center={[this.state.mapCenterLat, this.state.mapCenterLng]}
          zoom={this.state.mapZoom}
          maxZoom={20}
          minZoom={2}
          length={4}
          ref={this.mapRef}
          onLocationfound={this.handleLocationFound}
          id="Map"
          className='mappityMap'
          onClick={this.handleClick}
          style={this.state.style}
          useFlyTo={true} >
          <TileLayer
            url={this.state.basemap}
            maxZoom={20}/>
          <MarkerClusterGroup>
            {potholeComponents}
          </MarkerClusterGroup>
          <Circle
            center = {[this.state.circleLat, this.state.circleLng]}
            radius = {this.state.circleRad}
          ></Circle>
          <div className="btn-group" id="basemap-buttons" role="group" aria-label="">
            <button
              type="button"
              className="btn"
              onClick={this.basemapNashville} >
              Default
            </button>
            <button
              type="button"
              className="btn"
              onClick={this.basemapStreets} >
              Streets</button>
            <button
              type="button"
              className="btn"
              onClick={this.basemapSatelliteStreets} >
              Satellite
            </button>
          </div>
        </Map>
        <div className='buttons-action-top col-xs-12'>
          <div className='button-action-top-left col-xs-6 col-sm-2'>
            <button
              type="button"
              className = 'col-xs-12 btn menu-items-btn'
              onMouseUp={this.openLeftMenu}>
              <span className="glyphicon glyphicon-option-vertical" aria-hidden="true"> </span>
                Action Items
            </button>
          </div>
          <div className='button-action-top-right col-xs-6 col-sm-offset-8 col-sm-2'>
            <button
              type="button"
              className = 'col-xs-12 btn btn-large btn-info menu-items-btn'
              onMouseUp={this.openRightMenu}>
              <span className="glyphicon glyphicon-list-alt" > </span>
                Legend
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MapMain;
