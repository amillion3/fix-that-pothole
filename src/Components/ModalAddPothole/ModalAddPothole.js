import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './ModalAddPothole.css';

class ModalAddPothole extends React.Component {
  state = {
    modalTempPothole: {},
  }

  modalBtnCancel = () => {
    this.setState({modalTempPothole: {}});
  };
  modalBtnSave = () => {
    const {modalTempPothole} = this.state;
    potholeRequests
      .potholePOST(modalTempPothole)
      .then(() => {
        // change state and show 'saved' Alert component
        this.setState({showAlert: true});
      })
      .then(() => {
        // Adds newly added pothole to state
        const temp = [...this.state.potholes];
        temp.push(modalTempPothole);
        this.setState({potholes: temp});
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
    const {showModal, tempPothole} = this.props;
    // this.setState({modalTempPothole: tempPothole});
    console.log('pre if statement, showModal:', showModal);
    // if (showModal) {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Add New Pothole</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label>Severity:</label><br/>
              <select value={this.state.modalTempPothole.severity} onChange={this.changeSeverity}>
                <option value="Low" onChange={this.changeSeverity}>Low</option>
                <option value="Moderate" onChange={this.changeSeverity}>Moderate</option>
                <option value="Severe" onChange={this.changeSeverity}>Severe</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionNotes">Notes:</label>
              <input
                type="text"
                className="form-control"
                id="descriptionNotes"
                // value={tempPothole.descriptionNotes}
                onChange={this.changeDescriptionNotes}/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='btn btn-primary'
            onClick={this.modalBtnSave}>
            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
          Save This Pothole
          </Button>
          <Button
            className='btn btn-danger'
            onClick={this.modalBtnCancel}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          Cancel and Clear
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalAddPothole;