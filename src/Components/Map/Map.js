import React from 'react';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';
import {MapComponent} from '@terrestris/react-geo';

// import MenuItemAddPothole from '../MenuItemAddPothole/MenuItemAddPothole';
import MapDigitizeButton from '../MapDigitizeButton/MapDigitizeButton';

import 'ol/ol.css';
import 'antd/dist/antd.css';
// import './react-geo.css';
import './Map.css';
// import { resolve } from 'url';

class Map extends React.Component {
  constructor (props) {
    super(props);
    this.mapDivId = `map-${Math.random()}`;
    const layer = new OlLayerTile({
      source: new OlSourceOsm(),
    });

    // // center coordinates are in EPSG:3857
    const center = [ -9657703.280456, 4318894.518143 ];

    // // create a new instance of ol.map in ES6 syntax
    this.mappityMap = new OlMap({
      view: new OlView({
        center: center,
        zoom: 16,
      }),
      layers: [layer],
      renderer: 'webgl',
    });
  }

  abc123 = () => {
    console.error('abc123');
  }

  render () {
    return (
      <div className="map-container col-xs-12">
        <MapComponent
          map={this.mappityMap}
        />
        <div className='map-container-menu col-xs-12'>
          <MapDigitizeButton
            map={this.mappityMap}
          />
          {/* <DigitizeButton
            name="drawPoint"
            className='col-xs-12 btn btn-danger'
            map={this.mappityMap}
            drawType="Point"
          >
          Draw point
          </DigitizeButton> */}
        </div>
      </div>
    );
  }
};

export default Map;
