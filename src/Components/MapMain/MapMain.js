import React, { createRef} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import GenerateMarkers from '../GenerateMarkers/GenerateMarkers';
import Alerts from '../Alerts/Alerts';
import ModalAddPothole from '../ModalAddPothole/ModalAddPothole';
import ModalLegend from '../ModalLegend/ModalLegend';

import potholeRequests from '../../firebaseRequests/potholeRequests';
import auth from '../../firebaseRequests/auth';
import constants from '../../constants';

import './MapMain.css';
require('react-leaflet-markercluster/dist/styles.min.css');
class MapMain extends React.Component {
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
      basemap: '',
      showModal: false,
      showAlert: false,
      showLegend: false,
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
        this.setState({basemap: customNashville});
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
      setTimeout(200);
      this.setState({tempPothole: potholeToAdd});
      this.addPointFalse();
      this.showModal();
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
  };

  onCancelModalLegend = () => {
    this.setState({showLegend: false});
  }

  eventLegend = e => {
    e.preventDefault();
    this.setState({showLegend: true});
  }

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
    this.addPointFalse();
    this.setState({showAlert: true});
    this.setState({showModal: false});
  }
  onCancelModal = () => {
    this.addPointFalse();
    this.setState({showModal: false});
  }

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
          onSaveModal={this.onSaveModal}
          onCancelModal={this.onCancelModal}
        ></ModalAddPothole>
        <ModalLegend
          showLegend={this.state.showLegend}
          onCancelModalLegend={this.onCancelModalLegend}
        ></ModalLegend>
        <Alerts
          alertText="Pothole record saved."
          showAlert={this.state.showAlert}
          onDismiss={this.onDismiss}
          bsStyle="success" />
        <Map
          center={[36.1531592, -86.7703593]}
          zoom={15}
          maxZoom={20}
          length={4}
          ref={this.mapRef}
          onLocationfound={this.handleLocationFound}
          id="Map"
          className='mappityMap'
          onClick={this.handleClick}
          style={this.state.style}>
          <TileLayer
            url={this.state.basemap}
            maxZoom={20}/>
          <MarkerClusterGroup>
            {potholeComponents}
          </MarkerClusterGroup>
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
        <div className='col-xs-12 menu-items'>
          <button
            type="button"
            className = 'col-xs-5 btn btn-large btn-warning menu-items-btn'
            onMouseUp={this.eventAddNewPothole}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"> </span>
              Add New Pothole
          </button>
          <button
            type="button"
            className = 'col-xs-5 col-xs-offset-2 btn btn-large btn-info menu-items-btn'
            onMouseUp={() => this.setState({showLegend: true})}>
            <span className="glyphicon glyphicon-list-alt" > </span>
              Legend
          </button>
        </div>
      </div>
    );
  }
};

export default MapMain;
