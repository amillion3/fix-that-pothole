import React, { Component } from 'react';
import {MapComponent} from '@terrestris/react-geo';

import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
// import './react-geo.css';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import './App.css';
// center coordinates are in EPSG:3857
const center = [ -9657703.280456, 4318894.518143 ];

const layer = new OlLayerTile({
  source: new OlSourceOsm(),
});

const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 16,
  }),
  layers: [layer],
});

class App extends Component {

  render () {
    return (
      <div className="App">
        <h1>Fix That Pothole</h1>
        <MapComponent
          map={map}
        />
      </div>
    );
  }
}

export default App;
