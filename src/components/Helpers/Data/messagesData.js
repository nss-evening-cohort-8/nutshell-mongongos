// Author: Marco Crank
// Purpose: Handle all the Axios call to Firebase for the Messages collection

import axios from 'axios';
import moment from 'moment';
import apiKeys from '../../../../db/apiKeys.json';

const fireBaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMessages = () => new Promise((resolve, reject) => {
  axios.get(`${fireBaseUrl}/messages.json?orderBy="timestamp"&limitToLast=30`)
    .then((results) => {
      const messagesArray = [];
      const messagesObj = results.data;
      if (messagesObj !== null) {
        Object.keys(messagesObj).forEach((message) => {
          messagesArray.push(messagesObj[message]);
        });
        // Sort array by timestamp because Firebase REST does not return a sort 😢
        messagesArray.sort((a, b) => moment(a.timestamp).unix() - moment(b.timestamp).unix());
      }
      resolve(messagesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getAllMessages };
