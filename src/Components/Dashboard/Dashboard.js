import React from 'react';

import DashPothole from '../DashPothole/DashPothole';
import potholeRequests from '../../firebaseRequests/potholeRequests';

import './Dashboard.css';

class Dashboard extends React.Component {
  state = {
    potholes: [],
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
