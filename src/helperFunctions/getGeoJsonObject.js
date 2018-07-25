
import potholeRequests from '../../firebaseRequests/potholeRequests';
import jsonToGeoJson from './jsonToGeoJson';

const getGeoJsonObject = () => {
  potholeRequests
    .potholesGETAll()
    .then(response => {
      return response;
    })
    .then(allPotholes => {
      // console.error('yeehaw', jsonToGeoJson.jsonToGeoJson(allPotholes));
      return (jsonToGeoJson.jsonToGeoJson(allPotholes));

    })
    .then(() => {
      console.error('done');
    })
    .catch(error => {
      console.error('Error with getting potholes from firebase, ', error);
    });
};

export default getGeoJsonObject;
