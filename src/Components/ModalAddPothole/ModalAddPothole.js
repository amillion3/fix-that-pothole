import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import potholeRequests from '../../firebaseRequests/potholeRequests';

class ModalAddPothole extends React.Component {
  state = {
    show: false,
    tempPothole: {},
  };

  componentWillReceiveProps = () => {
    this.setState({show: this.props.show});
    this.setState({tempPothole: this.props.tempPothole});
  }

  modalBtnCancel = () => {
    this.addPointFalse(); // user cannot add points now
    this.hideModal();
    this.setState({tempPothole: {}});
  };
  modalBtnSave = () => {
    this.addPointFalse(); // user cannot add points now
    this.hideModal();
    const {tempPothole} = this.state;
    potholeRequests
      .potholePOST(tempPothole)
      .then(() => {
        // change state and show Alert component
        this.setState({alertShow: true});
      })
      .then(() => {
        // Adds newly added pothole to state
        const temp = [...this.state.potholes];
        temp.push(tempPothole);
        this.setState({potholes: temp});
      })
      .catch(err => console.error('Error during save', err));
  };

  changeSeverity = e => {
    const tempVal = {...this.state.tempPothole};
    tempVal.severity = e.target.value;
    this.setState({tempPothole: tempVal});
  };
  changeDescriptionNotes = e => {
    const tempVal = {...this.state.tempPothole};
    tempVal.descriptionNotes = e.target.value;
    this.setState({tempPothole: tempVal});
  };

  render () {
    const {tempPothole} = this.state;
    return (
      <Modal show={this.state.show} onHide={this.hideModal}>
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

export default ModalAddPothole;
