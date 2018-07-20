import React from 'react';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';
import OlProj from 'ol/proj';
import {DigitizeButton, ToggleGroup} from '@terrestris/react-geo';

import 'ol/ol.css';
import 'antd/dist/antd.css';
// import './react-geo.css';
import './Map.css';

class Map extends React.Component {
  constructor (props) {
    super(props);
    this.mapDivId = `map-${Math.random()}`;

    this.map = new OlMap({
      layers: [
        new OlLayerTile({
          name: 'OSM',
          source: new OlSourceOsm(),
        }),
      ],
      view: new OlView({
        center: OlProj.fromLonLat([-86.7587529,36.1325381]),
        zoom: 14,
      }),
    });
  }

  componentDidMount () {
    this.map.setTarget(this.mapDivId);
  }

  componentDidUpdate () {
    console.error('hi');
  }

  render () {

    const handleClick = e => {
      console.error('clickity', e);
      console.error(e.feature.geometryChangeKey_.target.flatCoordinates);
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
              onDrawEnd={handleClick}
            >
            Draw point
            </DigitizeButton>
          </ToggleGroup>
        </div>
      </div>
    );
  }
};

export default Map;
