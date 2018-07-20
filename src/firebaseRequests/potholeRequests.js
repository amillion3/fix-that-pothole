import constants from '../constants';
import axios from 'axios';

const potholePOST = newPothole => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/potholes.json`, newPothole)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {potholePOST};
