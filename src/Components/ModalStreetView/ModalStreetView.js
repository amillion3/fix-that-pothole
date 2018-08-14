import React from 'react';
import {Button, Modal} from 'react-bootstrap';

import './ModalStreetView.css';

class ModalStreetView extends React.Component {
  modalBtnCloseStreet = () => {
    this.props.onCancelModalStreet();
  };

  render () {
    const {showStreetModal} = this.props;
    return (
      <Modal show={showStreetModal}>
        <div>
          <h1>hello</h1>
        </div>
        <Modal.Footer>
          <Button
            className='btn'
            onClick={this.modalBtnCloseStreet}>
            <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
          Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalStreetView;
