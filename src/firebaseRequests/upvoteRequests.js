import constants from '../constants';
import axios from 'axios';
import auth from './auth';

const upvoteGET = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/upvotes/${id}.json`)
      .then(response => {
        console.log(response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {upvoteGET};
