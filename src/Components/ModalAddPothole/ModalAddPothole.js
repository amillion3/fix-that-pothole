import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './ModalAddPothole.css';

class ModalAddPothole extends React.Component {
  state = {
    modalTempPothole: {},
  }

  componentWillReceiveProps () {
    this.setState({modalTempPothole: this.props.tempPothole});
    this.setState({showModal: this.props.showModal});
  }

  modalBtnCancel = () => {
    this.setState({modalTempPothole: {}});
    this.setState({showModal: false});
    this.props.onCancelModal();
  };
  modalBtnSave = () => {
    const {modalTempPothole} = this.state;
    potholeRequests
      .potholePOST(modalTempPothole)
      .then(() => {
        this.props.onSaveModal();
      })
      .then(() => {
        // Adds newly added pothole to state
        const temp = {...this.state.modalTempPothole};
        this.setState({modalTempPothole: temp});
      })
      .then(() => {
        this.setState({showModal: false});
      })
      .catch(err => console.error('Error during save', err));
  };

  changeSeverity = e => {
    const tempVal = {...this.state.modalTempPothole};
    tempVal.severity = e.target.value;
    this.setState({modalTempPothole: tempVal});
  };
  changeDescriptionNotes = e => {
    const tempVal = {...this.state.modalTempPothole};
    tempVal.descriptionNotes = e.target.value;
    this.setState({modalTempPothole: tempVal});
  };

  render () {
    const {showModal} = this.props;
    return (
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Add New Pothole</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label>Severity:</label><br/>
              <select value={this.state.modalTempPothole.severity} onChange={this.changeSeverity}>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionNotes">Notes:</label>
              <input
                type="text"
                className="form-control"
                id="descriptionNotes"
                onChange={this.changeDescriptionNotes}/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className='btn'
            onMouseUp={this.modalBtnSave}>
            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
          Save This Pothole
          </Button>
          <Button
            type="button"
            className='btn'
            onMouseUp={this.modalBtnCancel}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          Cancel and Clear
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalAddPothole.propTypes = {
  showModal: PropTypes.bool.isRequired,
  tempPothole: PropTypes.object.isRequired,
};

export default ModalAddPothole;
