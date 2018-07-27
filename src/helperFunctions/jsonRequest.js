import axios from 'axios';
import data from '../db/tempPotholes.geojson';

import {getGeoJsonObject} from './getGeoJsonObject';

const getJson = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: data,
      headers: {
        'Content-Type': 'application/json' },
    })
      .then(response => {
        console.log('new promise!!', response.data);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {getJson};
