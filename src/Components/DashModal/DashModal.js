import React from 'react';

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
        console.error('dashmodal this.state', this.state);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render () {
    // const {details} = this.props;
    return (
      <div>
        <h1>HIHIHI</h1>
      </div>
      // <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      //   <div className="modal-dialog" role="document">
      //     <div className="modal-content">
      //       <div className="modal-header">
      //         <h4 className="modal-title" id="myModalLabel">{details.status}</h4>
      //       </div>
      //       <div className="modal-body">
      //         ...
      //       </div>
      //       <div className="modal-footer">
      //         ...
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default DashModal;
