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
  const newAvatar = document.getElementById('addAvatarInput').files[0];
  axios.post(`${apiKeys.firebaseKeys.storageBucket}`, newAvatar);
};

const avatarsBuilder = () => {
  const avatarString = `<h4 id='avatarTitle'>Choose your avatar</h4>
                        <input type='file' id='addAvatarInput' accept='image/png, image/jpeg' name='Upload an avatar'>
                        <div id='avatarSelectDiv'></div>
                        <button type='button' id='selectAvatarButton' class='btn btn-sm btn-success'>Select Avatar</button>`;
};

export default {
  selectAvatar,
  addAvatar,
  avatarsBuilder,
};
