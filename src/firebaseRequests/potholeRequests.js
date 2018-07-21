import constants from '../constants';
import axios from 'axios';

const potholePOST = newPothole => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/potholes.json`, newPothole)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const potholesGETAll = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/potholes.json`)
      .then(response => {
        const potholeArray = [];
        if (response.data !== null) {
          Object.keys(response.data).forEach(fbKey => {
            response.data[fbKey].id = fbKey;
            potholeArray.push(response.data[fbKey]);
          });
        }
        resolve(potholeArray);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const potholeGETSingle = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/potholes/${id}.json`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {potholePOST, potholesGETAll, potholeGETSingle};
