import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';
import authHelpers from '../authHelpers';

const URL = apiKeys.firebaseKeys.databaseURL;

const getPendingLosers = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/friendRequests.json?orderBy="friendUid"&equalTo="${uid}"`)
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

const getPendingLosersByUserUid = uid => new Promise((resolve, reject) => {
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

const getOtherLosers = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json`)
    .then((data) => {
      const losersObject = data.data;
      const losersArray = [];
      if (losersObject != null) {
        Object.keys(losersObject).forEach((loserId) => {
          losersObject[loserId].key = loserId;
          losersArray.push(losersObject[loserId]);
        });
      }
      const filt = losersArray.filter(loser => Object.keys(loser.friends).includes(uid) !== true);
      const filtered = filt.filter(loser => loser.uid !== uid);
      getPendingLosersByUserUid(authHelpers.getCurrentUid())
        .then((requests) => {
          let f = filtered;
          const requestsFriends = [];
          requests.forEach((request) => {
            requestsFriends.push(request.friendUid);
          });
          if (requests != null) {
            f = filtered.filter(loser => requestsFriends.includes(loser.uid) !== true);
          }
          resolve(f);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserTag = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((data) => {
      const userObject = data.data;
      const userArray = [];
      if (userObject != null) {
        Object.keys(userObject).forEach((user) => {
          userObject[user].key = user;
          userArray.push(userObject[user]);
        });
      }
      resolve(userArray[0].key);
    })
    .catch((err) => {
      reject(err);
    });
});

const getMyLosers = () => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="uid"&equalTo="${authHelpers.getCurrentUid()}"`)
    .then((data) => {
      const usersObject = data.data;
      const losersArray = [];
      let userKey;
      if (usersObject != null) {
        Object.keys(usersObject).forEach((user) => {
          userKey = user;
        });
        Object.keys(usersObject[userKey].friends).forEach((friend) => {
          losersArray.push(usersObject[userKey].friends[friend]);
        });
      }
      resolve(losersArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getOneUser = user => new Promise((resolve, reject) => {
  axios.get(`${URL}/users/${user}.json`)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

const sendLoserRequest = user => new Promise((resolve, reject) => {
  getOneUser(user)
    .then((data) => {
      const requestedLoser = data.data;
      const requestedLoserObject = {
        userUid: authHelpers.getCurrentUid(),
        friendUid: requestedLoser.uid,
      };
      axios.post(`${URL}/friendRequests.json`, JSON.stringify(requestedLoserObject))
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

const getUsersByRequests = requests => new Promise((resolve, reject) => {
  const usersArray = [];
  const promisesArray = [];
  requests.forEach((request) => {
    const user = request.userUid;
    promisesArray.push(axios.get(`${URL}/users.json?orderBy="uid"&equalTo="${user}"`));
  });
  Promise.all(promisesArray)
    .then((promisesReturnedArray) => {
      promisesReturnedArray.forEach((userObject) => {
        usersArray.push(userObject.data);
      });
      resolve(usersArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getRequestsByUser = () => new Promise((resolve, reject) => {
  axios.get(`${URL}/friendRequests.json?orderBy="friendUid"&equalTo="${authHelpers.getCurrentUid()}"`)
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
  user.filter(request => request.userUid.includes(friend));
  return user[0].requestId;
};

const completeRequest = loser => new Promise((resolve, reject) => {
  getRequestsByUser()
    .then((userMatches) => {
      axios.delete(`${URL}/friendRequests/${filterRequests(userMatches, loser)}.json`)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

const addLoserToUser = loserUid => new Promise((resolve, reject) => {
  let userWithLoser;
  getUserTag(authHelpers.getCurrentUid())
    .then((taggedUser) => {
      getOneUser(taggedUser)
        .then((userData) => {
          userWithLoser = userData.data;
          getUserTag(loserUid)
            .then((taggedLoser) => {
              getOneUser(taggedLoser)
                .then((loserData) => {
                  const loserInfo = {
                    userName: loserData.data.userName,
                    uid: loserData.data.uid,
                    avatar: loserData.data.avatar,
                  };
                  if (userWithLoser.friends === '') {
                    userWithLoser.friends = {
                      [loserData.data.uid]: loserInfo,
                    };
                  } else { userWithLoser.friends[loserData.data.uid] = loserInfo; }
                  axios.put(`${URL}/users/${taggedUser}.json`, JSON.stringify(userWithLoser))
                    .then(() => {
                      resolve();
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

const addUserToLoser = (loserUid) => {
  let loserWithUser;
  getUserTag(authHelpers.getCurrentUid())
    .then((taggedUser) => {
      getOneUser(taggedUser)
        .then((userData) => {
          const userInfo = {
            userName: userData.data.userName,
            uid: userData.data.uid,
            avatar: userData.data.avatar,
          };
          getUserTag(loserUid)
            .then((taggedLoser) => {
              getOneUser(taggedLoser)
                .then((loserData) => {
                  loserWithUser = loserData.data;
                  if (loserWithUser.friends === '') {
                    loserWithUser.friends = {
                      [userData.data.uid]: userInfo,
                    };
                  } else { loserWithUser.friends[userData.data.uid] = userInfo; }
                  axios.put(`${URL}/users/${taggedLoser}.json`, JSON.stringify(loserWithUser));
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLoser = loserId => new Promise((resolve, reject) => {
  getUserTag(authHelpers.getCurrentUid())
    .then((taggedUser) => {
      axios.delete(`${URL}/users/${taggedUser}/friends/${loserId}.json`)
        .then(() => {
          getOneUser(taggedUser)
            .then((data) => {
              const friends = data.data;
              if (friends.friends === undefined) {
                friends.friends = '';
                axios.put(`${URL}/users/${taggedUser}.json`, JSON.stringify(friends));
              }
              getUserTag(loserId)
                .then((taggedLoser) => {
                  axios.delete(`${URL}/users/${taggedLoser}/friends/${authHelpers.getCurrentUid()}.json`)
                    .then(() => {
                      getOneUser(taggedLoser)
                        .then((loserData) => {
                          const friends2 = loserData.data;
                          if (friends2.friends === undefined) {
                            friends.friends = '';
                            axios.put(`${URL}/users/${taggedLoser}.json`, JSON.stringify(friends2));
                          }
                          resolve();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

export default {
  getOtherLosers,
  sendLoserRequest,
  getOneUser,
  getPendingLosers,
  completeRequest,
  addLoserToUser,
  addUserToLoser,
  getUsersByRequests,
  getMyLosers,
  deleteLoser,
  getUserTag,
  getPendingLosersByUserUid,
};
