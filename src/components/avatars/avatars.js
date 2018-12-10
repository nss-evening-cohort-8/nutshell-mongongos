import $ from 'jquery';
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';
import losersData from '../Helpers/Data/losersData';
import avatarsData from '../Helpers/Data/avatarsData';
import authHelpers from '../Helpers/authHelpers';
import './avatars.scss';

let selectedAvatar = '';

const getSelectedAvatar = () => selectedAvatar;

// Event for user choosing an avatar from the list

const clickOnAvatar = () => {
  $('.avatarImage').on('click', (event) => {
    const selection = event.target;
    $('.avatarImage').removeClass('selectedAvatar');
    $(selection).toggleClass('selectedAvatar');
    selectedAvatar = selection.dataset.avatarUrl;
  });
};

// Builds the list of avatars and applys events

const selectAvatarBuilder = () => {
  avatarsData.getAvatars()
    .then((avatarUrls) => {
      let avatarString = '';
      const avatarsArray = avatarUrls;
      avatarsArray.forEach((avatarURL) => {
        avatarString += `<image class='avatarImage' src='${avatarURL}'alt='Avatar failed to load' data-avatar-url='${avatarURL}'/>`;
      });
      $('#avatarSelectDiv').html(avatarString);
      clickOnAvatar();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Adds the chosen avatar to the users profile

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
