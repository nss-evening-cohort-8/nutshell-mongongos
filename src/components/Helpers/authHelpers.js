import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../Auth/auth';
import usersData from './Data/usersData';
import users from '../Users/users';

const userNameExists = (userId) => {
  if (!(usersData.hasUserName(userId))) {
    users.userNameModal();
    $('#users-modal').modal('show');
  }
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userNameExists(user.uid);
      // console.log(user.uid);
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

export default { checkLoginStatus };
