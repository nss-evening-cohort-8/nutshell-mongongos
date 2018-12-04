// Authors: Marco Crank
// Purpose: Handle any Misc Authentication calls.

import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../Auth/auth';
import usersData from './Data/usersData';
import users from '../Users/users';

// Checks if am Authenticated User has a username in the DB
// Presents Modal to create/Edit a userName
const userNameExists = (userId) => {
  usersData.hasUserName(userId)
    .then((result) => {
      if (result === false) {
        users.userNameModal(userId);
        $('#users-modal').modal('show');
      }
    })
    .catch((error) => {
      console.error('An error occured checking for existing user name', error);
    });
};

const checkLoginStatus = (messages) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userNameExists(user.uid);
      $('#login-page').html('');
      $('#nav-logout').show();
      $('#nav-friends').show();
      messages();
    } else {
      $('#nav-logout').hide();
      $('#nav-friends').hide();
      $('#message-container').html('');
      $('#message-input').html('');
      auth.loginPage();
    }
  });
};

const getUsderId = () => {
  firebase.auth().onAuthStateChanged(user => user.uid);
};

export default { checkLoginStatus, getUsderId };
