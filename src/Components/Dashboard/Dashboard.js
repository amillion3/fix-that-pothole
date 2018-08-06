import React from 'react';

import DashPothole from '../DashPothole/DashPothole';
import Alerts from '../Alerts/Alerts';
import potholeRequests from '../../firebaseRequests/potholeRequests';

import './Dashboard.css';

class Dashboard extends React.Component {
  state = {
    potholes: [],
    showAlertDeleted: false,
    showAlertUpdated: false,
  };

  // loads ALL potholes into this.state via Axios promise
  componentDidMount () {
    potholeRequests
      .potholesGETAll()
      .then(a => {
        this.setState({potholes: a});
      })
      .catch(err => console.error('Error with getting all potholes.', err));
  }

  onDismiss = () => {
    this.setState({showAlertDeleted: false});
    this.setState({showAlertUpdated: false});
  }

  render () {
    // .map through ALL potholes
    const potholeComponents = this.state.potholes.map(pothole => {
      return (
        <DashPothole
          details={pothole}
          key={pothole.id}
          status={pothole.status}
          createdDate={pothole.createdDate}
          severity={pothole.severity}
          descriptionNotes={pothole.descriptionNotes}
          updated={pothole.updated}
          firebaseId={pothole.id}
        />
      );
    });

    return (
      <div className='dashboard'>
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
        <table className='table table-hover'>
          <thead>
            <tr>
              <th className='dash-pothole-mobile'>Status</th>
              <th className='dash-pothole-mobile'>Date</th>
              <th className='dash-pothole-mobile'>Severity</th>
              <th>Notes</th>
              <th className='dash-pothole-mobile'>Updated</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {potholeComponents}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Dashboard;
