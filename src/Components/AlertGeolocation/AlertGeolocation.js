import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from 'react-bootstrap';

import './AlertGeolocation.css';

class AlertGeolocation extends React.Component {
  render () {
    const { alertText, showAlert, onDismiss, bsStyle } = this.props;
    if (showAlert) {
      return (
        <Alert
          className="mp-alert col-sm-8 col-sm-offset-2 col-xs-offset-1 col-xs-10"
          bsStyle={bsStyle}>
          <div className="row">
            <div className="col-xs-12 col-sm-offset-1 col-sm-10 text-left">
              { alertText }
            </div>
            <div className="col-xs-12 col-sm-1 text-center alert-button">
              <Button onClick={onDismiss}>&times;</Button>
            </div>
          </div>
        </Alert>
      );
    } else {
      return null;
    }
  }
}

AlertGeolocation.propTypes = {
  alertText: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default AlertGeolocation;
