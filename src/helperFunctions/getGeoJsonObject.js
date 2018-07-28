
import potholeRequests from '../firebaseRequests/potholeRequests';
import jsonToGeoJson from './jsonToGeoJson';

let test = {};

const getGeoJsonObject = () => {
  potholeRequests
    .potholesGETAll()
    .then(response => {
      console.error('helper:getGeoJsonObject response', response);
      // console.error('helper function COMPLETE:', jsonToGeoJson.jsonToGeoJson(response));
      test = jsonToGeoJson.jsonToGeoJson(response);
      return test;
    })
    .catch(error => {
      console.error('Error with getting potholes from firebase, ', error);
    });
  return test;
};

export {getGeoJsonObject};
