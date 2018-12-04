import $ from 'jquery';
import firebase from 'firebase/app';
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const storage = firebase.storage();
const mainRef = storage.ref();

const selectAvatar = () => {
  const avatarsArray = [];
  mainRef.child().foreach((imageRef) => {
    avatarsArray.push(imageRef.getDownloadURL());
  });
  let avatarString = '';
  avatarsArray.forEach((avatarURL) => {
    avatarString += `<image class='avatarImage' src='${avatarURL}' alt='Avatar failed to load' data-avatar-url='${avatarURL}'/>`;
  });
  $('#avatarSelectDiv').html(avatarString);
};

const addAvatar = () => {
  let newAvatar = document.getElementById('addAvatarInput').files[0];
  axios.post(`${apiKeys.firebaseKeys.storageBucket}`, newAvatar);
};

export default {
  selectAvatar,
  addAvatar,
};
