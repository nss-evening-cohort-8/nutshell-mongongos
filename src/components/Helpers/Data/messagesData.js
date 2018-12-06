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
          messagesObj[message].id = message;
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

const createUserMsg = msgObj => axios.post(`${fireBaseUrl}/messages.json`, JSON.stringify(msgObj));

const deleteUserMsg = msgId => axios.delete(`${fireBaseUrl}/messages/${msgId}.json`);

const updateUserMsg = (msgObj, msgId) => new Promise((resolve, reject) => {
  axios
    .put(`${fireBaseUrl}/messages/${msgId}.json`, JSON.stringify(msgObj))
    .then((results) => {
      resolve(results);
    })
    .catch((error) => {
      console.error('An error occured updating your message', error);
      reject(error);
    });
});

// const updateTask = (taskObj, taskId) => new Promise((resolve, reject) => {
//   axios
//     .put(`${firebaseUrl}/tasks/${taskId}.json`, JSON.stringify(taskObj))
//     .then((results) => {
//       resolve(results);
//     })
//     .catch((error) => {
//       console.error(error);
//       reject(error);
//     });
// });

export default {
  getAllMessages,
  createUserMsg,
  deleteUserMsg,
  updateUserMsg,
};
