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
    // this.setState({show: this.props.show});
    if (this.state.show) {
      return (
        <Alert
          className='Alerts text-center'
          id="currentAlert"
          bsStyle={this.props.bsStyle}
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
        null
      );
    }
  }
}

export default Alerts;
