import React from 'react';
// import PropTypes from 'prop-types';
import {Alert, Button} from 'react-bootstrap';

class Alerts extends React.Component {
  render () {
    const { alertText, showAlert, onDismiss } = this.props;
    if (showAlert) {
      return (
        <Alert className="mp-alert col-sm-4 col-sm-offset-4 col-xs-12">
          <div className="row">
            <div className="col-sm-6 text-left">
              { alertText }
            </div>
            <div className="col-sm-6 text-right">
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

// Alerts.propTypes = {
//   bsStyle: PropTypes.string.isRequired,
//   alertText: PropTypes.string.isRequired,
// };

export default Alerts;
