import React from 'react';
import {Modal} from 'react-bootstrap';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './DashModal.css';

class DashModal extends React.Component {
  state = {

  }

  componentDidMount () {
    potholeRequests
      .potholeGETSingle(this.props.firebaseId)
      .then(response => {
        this.setState(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render () {
    const {details} = this.props;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <h1>{details.status}</h1>
        </Modal.Dialog>
      </div>
    );
  }
}

export default DashModal;
