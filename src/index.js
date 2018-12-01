import firebase from 'firebase/app';
import 'bootstrap';
import navbar from './components/Navbar/navbar';
import auth from './components/Auth/auth';
import authHelper from './components/Helpers/authHelpers';

import apiKeys from '../db/apiKeys.json';
import './index.scss';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.autheEvents();
  navbar.buildNavbar();
  authHelper.checkLoginStatus();
};

initialize();
