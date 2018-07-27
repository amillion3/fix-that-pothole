import React from 'react';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';
import OlProj from 'ol/proj';
import {DigitizeButton, ToggleGroup} from '@terrestris/react-geo';
import VectorLayer from 'ol/layer/vector.js';
import VectorSource from 'ol/source/vector.js';
import GeoJSON from 'ol/format/geojson.js';

import auth from '../../firebaseRequests/auth';
import potholeRequests from '../../firebaseRequests/potholeRequests';

import {getGeoJsonObject} from './getGeoJsonObject';

import {getJson} from '../../helperFunctions/jsonRequest';

import 'ol/ol.css';
import 'antd/dist/antd.css';
// import './react-geo.css';
import './Map.css';

const test = getJson();

class Map extends React.Component {
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

  constructor (props) {
    super(props);
    this.mapDivId = `map-${Math.random()}`;

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        // url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson',
        url: {getJson()},
        format: new GeoJSON(),
      }),
    });

    const vectorSource = new VectorSource({
      features: (new GeoJSON())
        .readFeatures(JSON.stringify(test)),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map = new OlMap({
      layers: [
        new OlLayerTile({
          name: 'OSM',
          source: new OlSourceOsm(),
        }),
        vectorLayer,
        // testing,
      ],

      view: new OlView({
        center: OlProj.fromLonLat([-86.7587529,36.1325381]),
        zoom: 14,
      }),
    });
  }

  componentWillMount () {
    // console.log(typeof(getGeoJsonObject()));
  }

  componentDidMount () {
    this.map.setTarget(this.mapDivId);
  }

  componentDidUpdate () {
    potholeRequests.potholePOST(this.state);
  }

  render () {
    const handleClick = e => {
      const coordinates = e.feature.geometryChangeKey_.target.flatCoordinates;
      const convertedCoordinates = OlProj.toLonLat(coordinates);
      this.setState({
        coordLat: convertedCoordinates[1],
        coordLong: convertedCoordinates[0],
        createdBy: auth.fbGetUid(),
        createdDate: new Date().toLocaleDateString('en-US'),
        descriptionNotes: '',
        itemId: '',
        severity: '',
        status: 'Newly added',
        updated: false,
        updatedDate: '',
        updatedUserId: '',
      });
      // const sample = OlProj.toLonLat(coordinates);
      // console.error('converted', sample);

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

    return (
      <div className='map-container'>
        <div
          id={this.mapDivId}
          className='mappityMap'
        />

        <div>
          <span>Select a digitize type:</span>
          <ToggleGroup>
            <DigitizeButton
              name="drawPoint"
              map={this.map}
              drawType="Point"
              digitizeLayerName='testingtesting'
              onDrawEnd={handleClick}>
            Draw point
            </DigitizeButton>
          </ToggleGroup>
        </div>
      </div>
    );
  }
};

export default Map;
