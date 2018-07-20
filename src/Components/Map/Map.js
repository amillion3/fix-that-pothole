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
  state = {
    newPothole: {
      coordX: '',
      coordY: '',
    },

  }

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
    console.error('compDidUpdate!');
  }

  render () {
    const handleClick = e => {
      const coordinates = e.feature.geometryChangeKey_.target.flatCoordinates;
      this.setState({
        newPothole: {
          coordX: coordinates[0],
          coordY: coordinates[1],
        },
      });
      console.error(this.state);
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
