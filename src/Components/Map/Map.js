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
  render () {
    return (
      <div>
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
            >
            Draw point
            </DigitizeButton>

            <DigitizeButton
              name="drawLine"
              map={this.map}
              drawType="LineString"
            >
            Draw line
            </DigitizeButton>

            <DigitizeButton
              name="drawPolygon"
              map={this.map}
              drawType="Polygon"
            >
            Draw polygon
            </DigitizeButton>

            <DigitizeButton
              name="drawCircle"
              map={this.map}
              drawType="Circle"
            >
            Draw circle
            </DigitizeButton>

            <DigitizeButton
              name="drawRectangle"
              map={this.map}
              drawType="Rectangle"
            >
            Draw rectangle
            </DigitizeButton>

            <DigitizeButton
              name="drawText"
              map={this.map}
              drawType="Text"
            >
            Draw text label
            </DigitizeButton>

            <DigitizeButton
              name="selectAndModify"
              map={this.map}
              editType="Edit"
            >
            Select and modify features
            </DigitizeButton>

            <DigitizeButton
              name="copyFeature"
              map={this.map}
              editType="Copy"
            >
            Copy features
            </DigitizeButton>

            <DigitizeButton
              name="deleteFeature"
              map={this.map}
              editType="Delete"
            >
            Delete features
            </DigitizeButton>

          </ToggleGroup>
        </div>
      </div>
    );
  }
};

export default Map;
