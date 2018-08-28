import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from 'react-bootstrap';

import './AlertGeolocation.css';

class Alerts extends React.Component {
  render () {
    const { alertText, showAlert, onDismiss, bsStyle } = this.props;
    if (showAlert) {
      return (
        <Alert
          className="mp-alert col-sm-6 col-sm-offset-3 col-xs-12"
          bsStyle={bsStyle}>
          <div className="row">
            <div className="col-sm-8 text-left">
              { alertText }
            </div>
            <div className="col-sm-4 text-right">
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

Alerts.propTypes = {
  alertText: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Alerts;
