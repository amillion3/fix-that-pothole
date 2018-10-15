import constants from '../constants';
import axios from 'axios';
// import auth from './auth';

const upvoteGET = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/upvotes.json?orderBy="firebaseId"&equalTo="${id}"`)
      .then(response => {
        const keys = Object.keys(response.data);
        const matchingKey = keys[0];
        resolve(response.data[matchingKey]);
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

const upvotePATCH = (firebaseId, votingFirebaseId) => {
  return new Promise((resolve, reject) => {
    // updatedPothole.updatedUserId = auth.fbGetUid();
    axios
      .patch(`${constants.firebaseConfig.databaseURL}/upvotes/${firebaseId}.json`, {
        "thisFirebaseId": votingFirebaseId,
      },
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// called when a new pothole is added
const upvotePOST = (inputPothole, firebaseId) => {
  const baseUpvote = {
    "upvoteCount": 1,
    "createdBy": inputPothole.createdBy,
    "firebaseId": firebaseId,
    "thisFirebaseId": "",
    "upvoteUserIds": {"0": inputPothole.createdBy},
    "downvoteUserIds": {"0": ""},
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/upvotes.json`, baseUpvote)
      .then(response => {
        return response;
      })
      .then(id => {
        upvotePATCH(id.data.name, id.data.name);
        resolve(id);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {upvoteGET, upvotePUT, upvotePOST, upvotePATCH};
