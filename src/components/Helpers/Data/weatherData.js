import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';


const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllWeatherObjects = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((result) => {
      const weatherObject = result.data;
      const weatherArray = [];
      if (weatherObject != null) {
        Object.keys(weatherObject).forEach((weatherId) => {
          weatherObject[weatherId].id = weatherId;
          weatherArray.push(weatherObject[weatherId]);
        });
      }
      resolve(weatherArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getAllWeatherObjects };
