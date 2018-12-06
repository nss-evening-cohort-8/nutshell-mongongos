import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';
import losersData from '../Helpers/Data/losersData';
import authHelpers from '../Helpers/authHelpers';

let selectedAvatar = '';

const getSelectedAvatar = () => selectedAvatar;

const selectAvatarBuilder = () => {
  const storage = firebase.storage();
  const mainRef = storage.ref();
  console.log(mainRef);
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
    selectedAvatar = selection.dataset.avatarUrl;
  });
};

const selectAvatar = selection => new Promise((resolve, reject) => {
  losersData.getUserTag(authHelpers.getCurrentUid())
    .then((taggedUser) => {
      losersData.getOneUser(taggedUser)
        .then((userData) => {
          const userWithAvatar = userData.data;
          userWithAvatar.avatar = selection;
          axios.put(`${apiKeys.firebaseKeys.databaseURL}/users/${taggedUser}.json`, JSON.stringify(userWithAvatar))
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
    })
    .catch((err) => {
      console.log(err);
    });
});

export default {
  selectAvatarBuilder,
  selectAvatar,
  clickOnAvatar,
  getSelectedAvatar,
};
