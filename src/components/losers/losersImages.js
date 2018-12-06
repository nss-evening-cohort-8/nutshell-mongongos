import $ from 'jquery';
import firebase from 'firebase/app';
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const selectAvatarBuilder = () => {
  const storage = firebase.storage();
  const mainRef = storage.ref();
  const avatarsArray = [];
  mainRef.child().foreach((imageRef) => {
    avatarsArray.push(imageRef.getDownloadURL());
  });
  let avatarString = '';
  avatarsArray.forEach((avatarURL) => {
    avatarString += `<image class='avatarImage' src='${avatarURL}'alt='Avatar failed to load' data-avatar-url='${avatarURL}'/>`;
  });
  $('#avatarSelectDiv').html(avatarString);
};

const clickOnAvatar = () => {
  $('.avatarImage').on('click', (event) => {
    const selection = event.target;
    $('.avatarImage').removeClass('selectedAvatar');
    $(selection).toggleClass('selectedAvatar');
  });
};

const selectAvatar = () => {
  
};

const addAvatar = () => {
  const newAvatar = document.getElementById('addAvatarInput').files[0];
  axios.post(`${apiKeys.firebaseKeys.storageBucket}`, newAvatar);
};

export default {
  selectAvatarBuilder,
  selectAvatar,
  addAvatar,
  clickOnAvatar,
};
