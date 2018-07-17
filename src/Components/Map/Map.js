import React from 'react';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';
import {MapComponent} from '@terrestris/react-geo';

import 'ol/ol.css';
import 'antd/dist/antd.css';
// import './react-geo.css';
import './Map.css';

const layer = new OlLayerTile({
  source: new OlSourceOsm(),
});

const center = [ 788453.4890155146, 6573085.729161344 ];

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 16,
  }),
  layers: [layer],
});

class Map extends React.Component {

  render () {
    return (
      <div className="map-container">
        <h1>Fix That Pothole</h1>
        <MapComponent
          map={map}
        />
      </div>
    );
  }
};

export default Map;
