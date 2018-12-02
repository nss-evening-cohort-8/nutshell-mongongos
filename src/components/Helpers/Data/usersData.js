import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const fireBaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllUserNames = () => new Promise((resolve, reject) => {
  axios.get(`${fireBaseUrl}/users.json`)
    .then((results) => {
      const userNameArray = [];
      const userNameObj = results.data;
      if (userNameObj !== null) {
        Object.keys(userNameObj).forEach((userName) => {
          userNameArray.push(userNameObj[userName].username);
        });
      }
      resolve(userNameArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const isExistingUserName = userName => new Promise((resolve, reject) => {
  axios.get(`${fireBaseUrl}/users.json?orderBy="username"&equalTo="${userName}"`)
    .then((result) => {
      const usersObj = result.data;
      if (Object.getOwnPropertyNames(usersObj).length !== 0) {
        resolve(true);
      }
      resolve(false);
    })
    .catch((error) => {
      reject(error);
    });
});

const hasUserName = (userId) => {
  axios.get(`${fireBaseUrl}/users.json?orderBy="uid"&equalTo="${userId}"`)
    .then((result) => {
      const usersObj = result.data;
      if (Object.getOwnPropertyNames(usersObj).length !== 0) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createUserData = usersObj => axios.post(`${fireBaseUrl}/users.json`, JSON.stringify(usersObj));

export default {
  getAllUserNames,
  isExistingUserName,
  hasUserName,
  createUserData,
};
