import React from 'react';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './PotholeCompleteRecord.css';

class PotholeCompleteRecord extends React.Component {
  state = {

  }
  componentDidMount () {
    const firebaseId = this.props.match.params.id;
    potholeRequests
      .potholeGETSingle(firebaseId)
      .then(response => {
        console.error('response', response);
        this.setState(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render () {
    return (
      <div>
        <h2>{this.state.status}</h2>
      </div>
    );
  }
}

export default PotholeCompleteRecord;
