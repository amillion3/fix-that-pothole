import React from 'react';

import potholeRequests from '../../firebaseRequests/potholeRequests';
import DashPothole from '../DashPothole/DashPothole';

import './Dashboard.css';

class Dashboard extends React.Component {
  state = {
    potholes: [],
  };

  componentDidMount () {
    potholeRequests
      .potholesGETAll()
      .then(a => {
        this.setState({potholes: a});
      })
      .catch(err => {
        console.error('Error with getting pothole records: ', err);
      });
  }

  render () {
    const potholeComponents = this.state.potholes.map(pothole => {
      return (
        <DashPothole
          details={pothole}
          key={pothole.id}
          status={pothole.status}
          createdDate={pothole.createdDate}
          severity={pothole.severity}
          descriptionNotes={pothole.descriptionNotes}
          firebaseId={pothole.id}
        />
      );
    });

    return (
      <div className='table-responsive table-condensed table-bordered'>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Severity</th>
              <th>Notes</th>
              <th>Full Details</th>
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
