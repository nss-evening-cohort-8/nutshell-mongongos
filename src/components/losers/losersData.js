import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../Helpers/authHelpers';

const URL = apiKeys.firebaseKeys.databaseURL;

const getOtherLosers = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderByChild="child/friends/${uid}"&equalTo="null"`)
    .then((data) => {
      const losersObject = data.data;
      const losersArray = '';
      if (losersObject != null) {
        Object.keys(losersObject).forEach((loserId) => {
          losersArray.push(losersObject[loserId]);
        });
      }
      resolve(losersArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getOneUser = (user) => {
  axios.get(`${URL}/users/${user}.json`);
};

const sendLoserRequest = (user) => {
  getOneUser(user)
    .then((data) => {
      const requestedLoser = data.data;
      const requestedLoserObject = {
        userUid: authHelpers.getCurrentUid(),
        friendUid: requestedLoser.uid,
        isAccepted: false,
        isPending: true,
      };
      axios.post(`${URL}/friendRequests.json`, JSON.stringify(requestedLoserObject));
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPendingLosers = (uid) => {
  axios.get(`${URL}/friendRequests.json?orderBy="userUid"&equalTo="${uid}"`);
};

export default {
  getOtherLosers,
  sendLoserRequest,
  getOneUser,
  getPendingLosers,
};
