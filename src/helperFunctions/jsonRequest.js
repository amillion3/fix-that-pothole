import axios from 'axios';

import {getGeoJsonObject} from './getGeoJsonObject';

const getJson = () => {
  return new Promise((resolve, reject) => {
    const stuff = getGeoJsonObject();
    console.log(stuff);
    axios
      .get(`${stuff}.geojson`)
      .then(response => {
        console.log('new promise', response);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {getJson};
