import React from 'react';
import {Alert} from 'react-bootstrap';

import './UserAlerts.css';

class UserAlerts extends React.Component {
  render () {
    return (
      <Alert
        message={this.props.message}
        bsStyle={this.props.alertType}
      >
      </Alert>
      // alert('SAVED')
    );
  }
};

export default UserAlerts;
