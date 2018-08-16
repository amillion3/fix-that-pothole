import constants from '../../constants';
import axios from 'axios';

const getMailingAddress = (lat, long) => {
  const apiKey = constants.geocoding;
  return new Promise((resolve, reject) => {
    const request = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${long}&format=json`;
    axios
      .get(request)
      .then(response => {
        // returns {} with complete mailing address
        resolve(response.data.display_name);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {getMailingAddress};
