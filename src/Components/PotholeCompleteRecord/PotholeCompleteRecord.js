import React from 'react';

import potholeRequests from '../../firebaseRequests/potholeRequests';

import './PotholeCompleteRecord.css';

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
      .catch(err => {
        console.error(err);
      });
  }

  changeStatus = e => {};
  changeSeverity = e => {};
  changeDescriptionNotes = e => {};
  changeLatitude = e => {};
  changeLongitude = e => {};

  render () {
    const p = this.state;
    const {isEditing} = this.state.isEditing;

    const clickEditButton = () => {
      this.setState(false);
    };

    const clickDeleteButton = () => {
      potholeRequests
        .potholeDELETE(firebaseId)
        .then(response => {
          this.props.history.push(`/dashboard`);
        });
    };
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            {isEditing === false
              ? (
                <div>
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
                    <button
                      className='btn btn-info col-xs-12'
                      onClick={clickEditButton}
                    >Edit Record</button>
                  </div>
                  <div className='col-xs-6'>
                    <button
                      className='btn btn-danger col-xs-12'
                      onClick={clickDeleteButton}
                    >Delete Record</button>
                  </div>
                </div>
              )
              : (
                <div>
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
                        type="date"
                        className="form-control"
                        id="createdDate"
                        value={p.createdDate}
                        readOnly />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Status:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="status"
                        value={p.status}
                        onChange={this.changeStatus}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="severity">Severity</label>
                      <input
                        type="text"
                        className="form-control"
                        id="severity"
                        value={p.severity}
                        onChange={this.changeSeverity}/>
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
                        type="date"
                        className="form-control"
                        id="updatedDate"
                        value={p.updatedDate}
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
