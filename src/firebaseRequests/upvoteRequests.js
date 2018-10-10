import constants from '../constants';
import axios from 'axios';
import auth from './auth';

const upvoteGET = id => {
  console.log('id',id);
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/upvotes/${id}.json`)
      .then(response => {
        console.log(response.data);
        const updatedResponse = response.data;
        updatedResponse.firebaseId = id;

        resolve(updatedResponse);
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

// called when a new pothole is added
const upvotePOST = inputPothole => {
  const baseUpvote = {
    "upvoteCount": 1,
    "createdBy": inputPothole.createdBy,
    "firebaseId": inputPothole.firebaseId,
    "upvoteUserIds": {},
    "downvoteUserIds": {},
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/upvotes.json`, baseUpvote)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {upvoteGET, upvotePUT, upvotePOST};
