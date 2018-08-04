import React from 'react';
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
          bsStyle={this.props.bsStyle}
          className='Alerts text-left'
          alertText={this.props.alertText} >

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
        <div></div>
      );
    }
  }
}

export default Alerts;
