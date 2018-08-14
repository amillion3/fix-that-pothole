import constants from '../constants';
import axios from 'axios';

const getMailingAddress = (lat, long, state) => {
  const inputLat = lat;
  const inputLong = long;
  const inputState = state;
  const apiKey = constants.geocoding;
  return new Promise((resolve, reject) => {
    console.log();
    const request = `https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/HTTP/default.aspx?lat=36.1863542&lon=-86.7940912&apikey=19fa4eaee6ee4d238437e13f63227485&format=json&notStore=false&version=4.01`;
    console.log('API request is:', request);
    axios
      .get(request)
      .then(response => {
        if (response.data !== null) {
          console.log('response', response);
        }
        // console.log('response.data.StreetAddresses[0]', response.data.StreetAddresses[0]);

        // const potholeArray = [];
        // if (response.data !== null) {
        //   Object.keys(response.data).forEach(fbKey => {
        //     response.data[fbKey].id = fbKey;
        //     potholeArray.push(response.data[fbKey]);
        //   });
        // }
        // resolve(nearestMailingAddress);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {getMailingAddress};
