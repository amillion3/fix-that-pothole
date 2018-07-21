import React from 'react';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './PotholeCompleteRecord.css';

class PotholeCompleteRecord extends React.Component {
  state = {}

  componentDidMount () {
    const firebaseId = this.props.match.params.id;
    // this gets the firebaseId
    potholeRequests
      .potholeGETSingle(firebaseId)
      .then(response => {
        this.setState(response);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render () {
    const p = this.state;
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <p><strong>Id: </strong>{p.itemId}</p>
            <p><strong>Created Date: </strong>{p.createdDate}</p>
            <p><strong>Created By: </strong>{p.createdBy}</p>
            <p><strong>Status: </strong>{p.status}</p>
            <p><strong>Severity: </strong>{p.severity}</p>
            <p><strong>Notes: </strong>{p.descriptionNotes}</p>
            <p><strong>Updated ? </strong>{p.updated}</p>
            <p><strong>Updated Date: </strong>{p.updatedDate}</p>
            <p><strong>Updated By: </strong>{p.updatedUserId}</p>
            <p><strong>Latitude: </strong>{p.coordLat}</p>
            <p><strong>Longitude: </strong>{p.coordLong}</p>
            <div className='col-xs-6'>
              <button className='btn btn-info col-xs-12'>Edit Record</button>
            </div>
            <div className='col-xs-6'>
              <button className='btn btn-danger col-xs-12'>Delete Record</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// back button would be nice
// collapse with a map marker

export default PotholeCompleteRecord;
