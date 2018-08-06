import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import './ModalAddPothole.css';

class ModalAddPothole extends React.Component {
  render () {
    const {showModal, tempPothole, onBtnSave, onBtnCancel} = this.props;
    if (showModal) {
      return (
        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Add New Pothole</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="">
              <div>
                <label>Severity:</label><br/>
                <select value={this.state.tempPothole.severity} onChange={this.changeSeverity}>
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
                  value={tempPothole.descriptionNotes}
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
}

export default ModalAddPothole;
