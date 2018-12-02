import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const fireBaseUrl = apiKeys.firebaseKeys.databaseURL;

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

export default { hasUserName, createUserData };
