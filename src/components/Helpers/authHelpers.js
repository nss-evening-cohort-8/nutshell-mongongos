import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../Auth/auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('##login-page').html('');
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
