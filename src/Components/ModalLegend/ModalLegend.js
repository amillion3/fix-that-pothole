import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './ModalLegend.css';

class ModalLegend extends React.Component {
  modalBtnCloseLegend = () => {
    this.props.onCancelModalLegend();
  };

  render () {
    const {showLegend} = this.props;
    return (
      <Modal show={showLegend}>
        <h2 id="title-legend" className='text-center'>Legend</h2>
        <div className='col-xs-12' id='container-legend'>
          <div className='red'>
            <img
              src="https://www.andymillion.com/fix-that-pothole/red.svg"
              className="marker-icon-legend" alt="Newly Added" />
            <h4 className="inline">Newly Added</h4>
          </div>
          <div className='purple'>
            <img
              src="https://www.andymillion.com/fix-that-pothole/purple.svg"
              className="marker-icon-legend" alt="Pothole Assigned" />
            <h4 className="inline">Pothole Assigned</h4>
          </div>
          <div className='orange'>
            <img
              src="https://www.andymillion.com/fix-that-pothole/orange.svg"
              className="marker-icon-legend" alt="Pothole Fixed" />
            <h4 className="inline">Pothole Fixed</h4>
          </div>
          <div className='yellow'>
            <img
              src="https://www.andymillion.com/fix-that-pothole/yellow.svg"
              className="marker-icon-legend" alt="Problem With Repair" />
            <h4 className="inline">Problem With Repair</h4>
          </div>
        </div>
        <Modal.Footer>
          <Button
            className='btn'
            onClick={this.modalBtnCloseLegend}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          Clear
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalLegend.propTypes = {
  onCancelModalLegend: PropTypes.func.isRequired,
  showLegend: PropTypes.bool.isRequired,
};

export default ModalLegend;
