import React from 'react';
import {Link} from 'react-router-dom';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './PotholeCompleteRecord.css';

// TO DO remove alert('') with modals or something

let firebaseId = '';
class PotholeCompleteRecord extends React.Component {
  state = {
    isEditing: false,
  }

  componentDidMount () {
    firebaseId = this.props.match.params.id;
    // this gets the firebaseId
    potholeRequests
      .potholeGETSingle(firebaseId)
      .then(response => {
        this.setState(response);
      })
      .then(() => {
        this.setState({isEditing: false});
      })
      .catch(err => {
        console.error(err);
      });
  }

  changeStatus = e => {
    this.setState({status: e.target.value});
  };
  changeSeverity = e => {
    this.setState({severity: e.target.value});
  };
  changeDescriptionNotes = e => {
    const tempVal = {...this.state.descriptionNotes };
    tempVal.descriptionNotes = e.target.value;
    this.setState({descriptionNotes: tempVal.descriptionNotes});
  };
  changeLatitude = e => {
    const tempVal = {...this.state.coordLat };
    tempVal.coordLat = e.target.value;
    this.setState({coordLat: tempVal.coordLat});
  };
  changeLongitude = e => {
    const tempVal = {...this.state.coordLong };
    tempVal.coordLong = e.target.value;
    this.setState({coordLong: tempVal.coordLong});
  };

  render () {
    const p = this.state;
    const isEditing = this.state.isEditing;

    const clickEditButton = () => {
      this.setState({isEditing: true});
    };

    const clickDeleteButton = () => {
      potholeRequests
        .potholeDELETE(firebaseId)
        .then(() => {
          this.setState({isEditing: false});
        })
        .then(response => {
          this.props.history.push(`/dashboard`);
          alert('Record deleted');
        });
    };
    const clickCancelButton = () => {
      potholeRequests
        .potholeGETSingle(firebaseId)
        .then(response => {
          this.setState(response);
          this.setState({isEditing: false});
        })
        .then(() => {
          this.props.history.push(`/dashboard`);
        })
        .catch(err => {
          console.error('Error with cancel request', err);
        });
    };
    const clickSaveButton = () => {
      potholeRequests
        .potholePUT(firebaseId, this.state)
        .then(() => {
          this.setState({isEditing: false});
        })
        .then(() => {
          this.props.history.push(`/dashboard`);
          alert('Record saved');
        });
    };

    return (
      <div className=''>
        <div className="panel panel-default pothole-complete-record">
          <div className="panel-body">
            {isEditing === false
              ? (
                <div>
                  <p><strong>Created Date: </strong>{p.createdDate}</p>
                  <p><strong>Created By: </strong>{p.createdBy}</p>
                  <p><strong>Status: </strong>{p.status}</p>
                  <p><strong>Severity: </strong>{p.severity}</p>
                  <p><strong>Notes: </strong>{p.descriptionNotes}</p>
                  <p><strong>Latitude: </strong>{p.coordLat}</p>
                  <p><strong>Longitude: </strong>{p.coordLong}</p>
                  <hr/>
                  {/* Ternary below determines if record has updates or not */}
                  {p.updated ?
                    <div>
                      <p><strong>Updated Date: </strong>{p.updatedDate}</p>
                      <p><strong>Updated Time: </strong>{p.updatedTime}</p>
                      <p><strong>Updated By: </strong>{p.updatedUserId}</p>
                    </div>
                    : <p><strong>No updates for this record.</strong></p>}
                  <div className='col-xs-3'>
                    <Link to='/dashboard'>
                      <button className='btn col-xs-12'>
                        <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                        Go Back
                      </button>
                    </Link>

                  </div>
                  <div className='col-xs-3'>
                    <button
                      className='btn col-xs-12'
                      onClick={clickEditButton}>
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    Edit Record</button>
                  </div>
                  <div className='col-xs-3'>
                    <button
                      className='btn col-xs-12'
                      onClick={clickDeleteButton}>
                      <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    Delete Record</button>
                  </div>
                </div>
              )
              : (
                <div>
                  <h3 className='text-center'>Edit This Pothole Record</h3>
                  <form className="">
                    <div className="form-group">
                      <label htmlFor="firebaseId">Id:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firebaseId"
                        value={p.itemId}
                        readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="createdDate">Created Date:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="createdDate"
                        value={p.createdDate}
                        readOnly />
                    </div>
                    <div>
                      <label>Status:</label><br/>
                      <select value={this.state.status} onChange={this.changeStatus}>
                        <option value="Newly Added" onChange={this.changeStatus}>Newly Added</option>
                        <option value="Pothole Assigned" onChange={this.changeStatus}>Pothole Assigned</option>
                        <option value="Pothole Fixed" onChange={this.changeStatus}>Pothole Fixed</option>
                        <option value="Problem With Repair" onChange={this.changeStatus}>Problem With Repair</option>
                      </select>
                    </div>
                    <div>
                      <label>Severity:</label><br/>
                      <select value={this.state.severity} onChange={this.changeSeverity}>
                        <option value="Low" onChange={this.changeSeverity}>Low</option>
                        <option value="Moderate" onChange={this.changeSeverity}>Moderate</option>
                        <option value="Severe" onChange={this.changeSeverity}>Severe</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="descriptionNotes">Notes:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="descriptionNotes"
                        value={p.descriptionNotes}
                        onChange={this.changeDescriptionNotes}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="updated">Updated ?</label>
                      <input
                        type="text"
                        className="form-control"
                        id="updated"
                        value={p.updated}
                        readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="updatedDate">Updated Date:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="updatedDate"
                        value={p.updatedDate}
                        readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="updatedTime">Updated Time:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="updatedTime"
                        value={p.updatedTime}
                        readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="updatedUserId">Updated User:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="updatedUserId"
                        value={p.updatedUserId}
                        readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputName2">Latitude</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName2"
                        value={p.coordLat}
                        onChange={this.changeLatitude}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputName2">Longitude</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName2"
                        value={p.coordLong}
                        onChange={this.changeLongitude}/>
                    </div>
                  </form>
                  <div className='col-xs-6'>
                    <button
                      className='btn btn-info col-xs-12'
                      onClick={clickSaveButton}>
                      <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    Save Changes
                    </button>
                  </div>
                  <div className='col-xs-6'>
                    <button
                      className='btn btn-danger col-xs-12'
                      onClick={clickCancelButton}>
                      <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                      Cancel</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

// back button would be nice
// collapse with a map marker

export default PotholeCompleteRecord;
