import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import apiKeys from '../../../../db/apiKeys.json';

const URL = apiKeys.firebaseKeys.databaseURL;
// const storageURL = apiKeys.firebaseKeys.storageBucket;

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
  const storage = firebase.storage();
  const mainRef = storage.ref();
  const newAvatarRef = mainRef.child(newAvatar.name);
  newAvatarRef.put(newAvatar)
    .then(() => {
      addAvatarDatabaseRef(newAvatar.name)
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

const getAvatars = () => new Promise((resolve, reject) => {
  const storage = firebase.storage();
  const mainRef = storage.ref();
  let avatarsArray = [];
  const avatarsPromiseArray = [];
  getAvatarDatabaseRef()
    .then((fileNames) => {
      fileNames.forEach((fileName) => {
        avatarsPromiseArray.push(mainRef.child(fileName).getDownloadURL());
      });
      Promise.all(avatarsPromiseArray)
        .then((urls) => {
          if (urls != null) {
            avatarsArray = urls;
          }
          resolve(avatarsArray);
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

export default {
  addAvatar,
  addAvatarDatabaseRef,
  getAvatarDatabaseRef,
  getAvatars,
};
