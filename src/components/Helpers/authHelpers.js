import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../Auth/auth';
import usersData from './Data/usersData';
import users from '../Users/users';

// Checks if am Authenticated User has a username in the DB
// Presents Modal to create/Edit a userName
const userNameExists = (userId) => {
  if (!(usersData.hasUserName(userId))) {
    users.userNameModal(userId);
    $('#users-modal').modal('show');
  }
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userNameExists(user.uid);
      $('#login-page').html('');
      $('#nav-logout').show();
      $('#nav-friends').show();
    } else {
      $('#nav-logout').hide();
      $('#nav-friends').hide();
      auth.loginPage();
    }
  });
};

const getUsderId = () => {
  firebase.auth().onAuthStateChanged(user => user.uid);
};

export default { checkLoginStatus, getUsderId };
