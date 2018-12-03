import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../Helpers/authHelpers';

const URL = apiKeys.firebaseKeys.databaseURL;

const getOtherLosers = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderByChild="child/friends/${uid}"&equalTo="null"`)
    .then((data) => {
      const losersObject = data.data;
      const losersArray = [];
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

const getPendingLosers = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/friendRequests.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((data) => {
      const requestsObject = data.data;
      const requestsArray = [];
      if (requestsObject != null) {
        Object.keys(requestsObject).forEach((requestTag) => {
          requestsObject[requestTag].requestTag = requestTag;
          requestsArray.push(requestsObject[requestTag]);
        });
      }
      resolve(requestsArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getUsersByRequests = (requests) => {
  const usersArray = [];
  let axiosCounter = 0;
  requests.forEach((request) => {
    const user = request.friendUid;
    axios.get(`${URL}/users.json?orderBy="uid"&equalTo="${user}"`)
      .then((userObject) => {
        usersArray.push(userObject.data);
        axiosCounter += 1;
        if (axiosCounter === requests.length) {
          return usersArray;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getRequestsByUser = () => new Promise((resolve, reject) => {
  axios.get(`${URL}/friendRequests.json?orderBy="userUid"&equalTo="${authHelpers.getCurrentUid()}"`)
    .then((data) => {
      const matchesObject = data.data;
      const matchesArray = [];
      if (matchesObject != null) {
        Object.keys(matchesObject).forEach((requestId) => {
          matchesObject[requestId].requestId = requestId;
          matchesArray.push(matchesObject[requestId]);
        });
      }
      resolve(matchesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const filterRequests = (user, friend) => {
  const filteredRequest = user.filter(request => request.includes(friend));
  return filteredRequest.requestId;
};

const completeRequest = (loser) => {
  let currentUserMatches = '';
  getRequestsByUser()
    .then((userMatches) => {
      currentUserMatches = userMatches.data;
      axios.delete(`${URL}/friendRequests/${filterRequests(currentUserMatches, loser)}.json`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addLoserToUser = (loserUid) => {
  let userWithLoser;
  getOneUser(authHelpers.getCurrentUid())
    .then((userData) => {
      userWithLoser = userData.data;
      getOneUser(loserUid)
        .then((loserData) => {
          const loserInfo = {
            name: loserData.data.name,
            uid: loserData.data.uid,
          };
          userWithLoser.friends[loserData.data.uid] += loserInfo;
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  axios.put(`${URL}/users.json?orderBy="uid"&equalTo="${authHelpers.getCurrentUid()}"`, JSON.stringify(userWithLoser));
};

export default {
  getOtherLosers,
  sendLoserRequest,
  getOneUser,
  getPendingLosers,
  completeRequest,
  addLoserToUser,
  getUsersByRequests,
};
