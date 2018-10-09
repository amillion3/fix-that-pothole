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

const upvotePUT = (firebaseId, updatedUpvote) => {
  return new Promise((resolve, reject) => {
    // updatedPothole.updatedUserId = auth.fbGetUid();
    axios
      .put(`${constants.firebaseConfig.databaseURL}/upvotes/${firebaseId}.json`, updatedUpvote)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {upvoteGET, upvotePUT};
