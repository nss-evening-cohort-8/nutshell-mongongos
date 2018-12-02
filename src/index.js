import firebase from 'firebase/app';
import 'bootstrap';
import navbar from './components/Navbar/navbar';
import auth from './components/Auth/auth';
import authHelper from './components/Helpers/authHelpers';
import losers from './components/losers/losers';

import apiKeys from '../db/apiKeys.json';
import './index.scss';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.autheEvents();
  navbar.buildNavbar();
  navbar.navbarEvents();
  losers.losersBuilder();
  authHelper.checkLoginStatus();
};

initialize();
