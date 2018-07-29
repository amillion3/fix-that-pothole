import constants from '../constants';
import axios from 'axios';
import auth from './auth';

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
        console.log('pothole array', potholeArray);
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

const potholeDELETE = firebaseId => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/potholes/${firebaseId}.json`, firebaseId)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const potholePUT = (firebaseId, updatedPothole) => {
  return new Promise((resolve, reject) => {
    updatedPothole.updated = true;
    updatedPothole.updatedDate = new Date().toLocaleDateString('en-US');
    updatedPothole.updatedTime = new Date().toLocaleTimeString('en-US');
    updatedPothole.updatedUserId = auth.fbGetUid();
    axios
      .put(`${constants.firebaseConfig.databaseURL}/potholes/${firebaseId}.json`, updatedPothole)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {potholePOST, potholesGETAll, potholeGETSingle, potholeDELETE, potholePUT};
