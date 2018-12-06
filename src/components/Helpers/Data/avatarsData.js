import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const URL = apiKeys.firebaseKeys.databaseURL;
const storageURL = apiKeys.firebaseKeys.storageBucket;

const addAvatarDatabaseRef = fileName => new Promise((resolve, reject) => {
  axios.post(`${URL}/avatarRef.json`, JSON.stringify(fileName))
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const getAvatarDatabaseRef = () => new Promise((resolve, reject) => {
  axios.get(`${URL}/avatarRef.json`)
    .then((data) => {
      const refObject = data.data;
      const refArray = [];
      if (refObject != null) {
        Object.keys(refObject).forEach((ref) => {
          refArray.push(refObject[ref]);
        });
      }
      resolve(refArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const addAvatar = () => new Promise((resolve, reject) => {
  const newAvatar = document.getElementById('addAvatarInput').files[0];
  axios.post(`${storageURL}`, newAvatar)
    .then(() => {
      addAvatarDatabaseRef(newAvatar)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  addAvatar,
  addAvatarDatabaseRef,
  getAvatarDatabaseRef,
};
