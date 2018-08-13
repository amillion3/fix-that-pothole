import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Alerts from '../Alerts/Alerts';
import potholeRequests from '../../firebaseRequests/potholeRequests';

import './PotholeCompleteRecord.css';

class PotholeCompleteRecord extends React.Component {
  state = {
    isEditing: false,
    firebaseId: '',
    showAlertDeleted: false,
    showAlertUpdated: false,
  }

  componentWillMount () {
    // Grabs firebaseId from URL and sets state
    this.setState({firebaseId: (this.props.match.params.id)});
  }

  componentDidMount () {
    const {firebaseId} = this.state;
    potholeRequests
      .potholeGETSingle(firebaseId)
      .then(response => {
        this.setState(response);
      })
      .then(() => {
        this.setState({isEditing: false});
      })
      .catch(err => console.error('Error getting single pothole:', err));
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

  onDismiss = () => {
    this.setState({showAlertDeleted: false});
    this.setState({showAlertUpdated: false});
    this.props.history.push(`/dashboard`);
  }

  render () {
    const p = this.state;
    const isEditing = this.state.isEditing;

    const clickEditButton = () => {
      this.setState({isEditing: true});
    };
    const clickDeleteButton = () => {
      const {firebaseId} = this.state;
      potholeRequests
        .potholeDELETE(firebaseId)
        .then(() => {
          this.setState({isEditing: false});
          this.setState({showAlertDeleted: true});
        })
        .catch(err => console.error('Error during delete: ', err));
    };
    const clickCancelButton = () => {
      const {firebaseId} = this.state;
      potholeRequests
        .potholeGETSingle(firebaseId)
        .then(response => {
          this.setState(response);
          this.setState({isEditing: false});
        })
        .then(() => {
          this.props.history.push(`/dashboard`);
        })
        .catch(err => console.error('Error with cancel request: ', err));
    };
    const clickSaveButton = () => {
      const {firebaseId} = this.state;
      potholeRequests
        .potholePUT(firebaseId, this.state)
        .then(() => {
          this.setState({isEditing: false});
          this.setState({showAlertUpdated: true});
        })
        .catch(err => console.error('Error during update: ', err));
    };

    return (
      <div className=''>
        <Alerts
          alertText="Pothole record deleted."
          showAlert={this.state.showAlertDeleted}
          onDismiss={this.onDismiss}
          bsStyle="danger"
        />
        <Alerts
          alertText="Pothole record updated."
          showAlert={this.state.showAlertUpdated}
          onDismiss={this.onDismiss}
          bsStyle="success"
        />
        <div className="panel panel-default pothole-complete-record">
          <div className="panel-body">
            {isEditing === false
              ? (
                <div>
                  <p><span className="complete-pothole-attribute">Created Date:</span> {p.createdDate}</p>
                  <p><span className="complete-pothole-attribute">Created Time:</span> {p.createdTime}</p>
                  <p><span className="complete-pothole-attribute">Created By:</span> {p.createdBy}</p>
                  <p><span className="complete-pothole-attribute">Status:</span> {p.status}</p>
                  <p><span className="complete-pothole-attribute">Severity:</span> {p.severity}</p>
                  <p><span className="complete-pothole-attribute">Notes:</span> {p.descriptionNotes}</p>
                  <p><span className="complete-pothole-attribute">Latitude:</span> {p.coordLat}</p>
                  <p><span className="complete-pothole-attribute">Longitude:</span> {p.coordLong}</p>
                  <p><span className="complete-pothole-attribute">Streetview:</span>
                      <a href={`
                      http://maps.google.com/maps?q=&layer=c&cbll=
                      ${p.coordLat},
                      ${p.coordLong}
                    `} target="_blank">
                      <button
                        type="button"
                        className="btn" >
                        <span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
                        Streetview
                      </button>
                    </a>
                  </p>
                  <hr/>
                  {/* Ternary below determines if record has updates or not */}
                  {p.updated ?
                    <div>
                      <p><span className="complete-pothole-attribute">Updated Date:</span> {p.updatedDate}</p>
                      <p><span className="complete-pothole-attribute">Updated Time:</span> {p.updatedTime}</p>
                      <p><span className="complete-pothole-attribute">Updated By:</span> {p.updatedUserId}</p>
                    </div>
                    : <p><span>No updates for this record.</span></p>}
                  <div className='col-xs-12 col-md-3 pothole-record-btn'>
                    <Link to='/dashboard'>
                      <button className='btn col-xs-12'>
                        <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                        To Dashboard
                      </button>
                    </Link>

                  </div>
                  <div className='col-xs-12 col-md-3 pothole-record-btn'>
                    <button
                      className='btn col-xs-12'
                      onClick={clickEditButton}>
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    Edit Record</button>
                  </div>
                  <div className='col-xs-12 col-md-3 pothole-record-btn'>
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
                      <select defaultValue={this.state.severity} onChange={this.changeSeverity}>
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
                      <label htmlFor="latitude">Latitude</label>
                      <input
                        type="text"
                        className="form-control"
                        id="latitude"
                        value={p.coordLat}
                        onChange={this.changeLatitude}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="longitude">Longitude</label>
                      <input
                        type="text"
                        className="form-control"
                        id="longitude"
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

PotholeCompleteRecord.propTypes = {
  firebaseId: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default PotholeCompleteRecord;
