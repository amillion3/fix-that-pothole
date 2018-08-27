import constants from '../constants';
import axios from 'axios';
import auth from './auth';

const potholePOST = inputPothole => {
  return new Promise((resolve, reject) => {
    if (inputPothole.severity === undefined) {
      inputPothole.severity = "Low";
    }

    const newPothole = {
      "coordLat": inputPothole.coordLat,
      "coordLong": inputPothole.coordLong,
      "createdBy": inputPothole.createdBy,
      "createdDate": new Date().toLocaleDateString('en-US'),
      "createdTime": new Date().toLocaleTimeString('en-US'),
      "descriptionNotes": inputPothole.descriptionNotes,
      "severity": inputPothole.severity,
      "status": inputPothole.status,
      "updated": inputPothole.updated,
      "updatedDate": inputPothole.updatedDate,
      "updatedTime": inputPothole.updatedTime,
      "updatedUserId": inputPothole.updatedUserId,
      "collectedZoomLevel": inputPothole.collectedZoomLevel,
      "collectedGeolocation": inputPothole.collectedGeolocation,
      "displayAddress": inputPothole.displayAddress,
    };

    if (inputPothole.collectedBasemap === constants.customNashville) {
      newPothole.collectedBasemap = 'Custom Basemap';
    } else if (inputPothole.collectedBasemap === constants.customStreets) {
      newPothole.collectedBasemap = 'Streets Basemap';
    } else {
      newPothole.collectedBasemap = 'Satellite Imagery Basemap';
    }

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
