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
const checkLoginStatus = (bindComponents) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userNameExists(user.uid);
      $('#login-page').html('');
      $('#nav-logout').show();
      $('#nav-friends').show();
      $('.outer-container').show();
      bindComponents();
    } else {
      $('#nav-logout').hide();
      $('#nav-friends').hide();
      $('#message-container').html('');
      $('#message-input').html('');
      $('#weather-header').html('');
      $('#weather-buttons').html('');
      $('#add-edit-zipcode').html('');
      $('#dropdown-container').html('');
      $('#weather-container').html('');
      $('#events-container').html('');
      $('#add-edit-event').html('');
      $('#add-event-button').html('');
      $('#event-button').html('');
      $('#events-modal-container').html('');
      $('#single-container').html('');
      $('#modal-section').html('');
      $('.outer-container').hide();
      auth.loginPage();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

const getProfilePic = () => firebase.auth().currentUser.photoURL;

export default { checkLoginStatus, getCurrentUid, getProfilePic };
