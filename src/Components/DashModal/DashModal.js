import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './DashModal.css';

class DashModal extends React.Component {
  state = {
    lat: 0,
    long: 0,
  };

  modalBtnCloseMap = () => {
    this.props.closeMapModal();
  };

  handleCoordinates = (a, b) => {
    this.setState({lat: a});
    this.setState({long: b});
  }

  render () {
    const {mapModalVisible} = this.props;
    return (
      <Modal show={mapModalVisible}>
        <h1>hello</h1>
        <Modal.Footer>
          <Button
            className='btn'
            onClick={this.modalBtnCloseLegend}
            handleCoordinates={this.handleCoordinates}
          >
            <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
          Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DashModal.propTypes = {
  closeMapModal: PropTypes.func.isRequired,
  mapModalVisible: PropTypes.bool.isRequired,
};

export default DashModal;
