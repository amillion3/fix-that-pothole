import React from 'react';
import potholeRequests from '../../firebaseRequests/potholeRequests';
import jsonToGeoJson from '../../helperFunctions/jsonToGeoJson';

class ShowPotholes extends React.Component {
  state = {

  }

  firebaseGetAllPotholes = () => {
    potholeRequests
      .potholesGETAll()
      .then(response => {
        console.error('original data, ', response);
        return response;
      })
      .then(allPotholes => {
        console.error('2nd .then', allPotholes);
        this.setState(jsonToGeoJson.jsonToGeoJson(allPotholes));
      })
      .then(() => {
        console.error('converted data', this.state);
      })
      .catch(error => {
        console.error('Error with getting potholes from firebase, ', error);
      });
  }

  componentDidMount () {
    this.firebaseGetAllPotholes();
  }

  render () {
    return (
      <div>

        hi</div>
    );
  }
};

export default ShowPotholes;
