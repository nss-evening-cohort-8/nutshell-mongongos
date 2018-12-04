// Author: Marco Crank
// Purpose: Handle all the Axios call to Firebase for the Messages collection

import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const fireBaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMessages = () => new Promise((resolve, reject) => {
  axios.get(`${fireBaseUrl}/messages.json`)
    .then((results) => {
      const messagesArray = [];
      const messagesObj = results.data;
      if (messagesObj !== null) {
        Object.keys(messagesObj).forEach((message) => {
          messagesArray.push(messagesObj[message]);
        });
      }
      resolve(messagesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getAllMessages };
