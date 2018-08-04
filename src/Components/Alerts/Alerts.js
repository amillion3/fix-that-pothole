import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from 'react-bootstrap';

class Alerts extends React.Component {
  state = {
    show: true,
  }
  removeAlert = () => {
    this.setState({show: false});
  }
  render () {
    if (this.state.show) {
      return (
        <Alert
          className='Alerts text-center'
          id="currentAlert"
          bsStyle={this.props.bsStyle} >

          {this.props.alertText}

          <Button
            className='text-right'
            onClick={this.removeAlert}>
            Dismiss
          </Button>
        </Alert>
      );
    } else {
      return (
        null
      );
    }
  }
}

Alerts.propTypes = {
  bsStyle: PropTypes.string.isRequired,
  alertText: PropTypes.string.isRequired,
};

export default Alerts;
