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

const getWeatherApi = zipcode => new Promise((resolve, reject) => {
  axios.get(`https://api.weatherbit.io/v2.0/current?postal_code=${zipcode}&country=US&key=${apiKeys.weatherbitKey.apiKey}`)
    .then((result) => {
      if (result.data === '') {
        resolve('noData');
      } else {
        const apiData = result.data.data[0];
        resolve(apiData);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const postNewLocation = weatherObject => axios.post(`${firebaseUrl}/weather.json`, JSON.stringify(weatherObject));

const deleteLocation = locationId => axios.delete(`${firebaseUrl}/weather/${locationId}.json`);

export default {
  getAllWeatherObjects,
  getWeatherApi,
  postNewLocation,
  deleteLocation,
};
