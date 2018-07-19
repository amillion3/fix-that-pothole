import React from 'react';
// const {ToggleGroup, DigitizeButton} = require('../../index');
import { DigitizeButton } from '@terrestris/react-geo';
class MapDigitizeButton extends React.Component {

  test = () => {
    console.error('abc123');
  }
  componentDidUpdate (prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
    console.error('hiii');
  }
  render () {
    return (
      <DigitizeButton
        name="drawPoint"
        className='col-xs-12 btn btn-danger'
        map={this.props.map}
        drawType="Point"
        // digitizeLayerName={testingtesting}
      >
      Draw point
      </DigitizeButton>
    );
  }
};

export default MapDigitizeButton;
