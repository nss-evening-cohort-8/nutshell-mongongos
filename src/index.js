// Authors: Marco Crank
// Purpose: Entry point into the Nutshell App.

import firebase from 'firebase/app';
import 'bootstrap';
import navbar from './components/Navbar/navbar';
import auth from './components/Auth/auth';
import authHelper from './components/Helpers/authHelpers';
import users from './components/Users/users';
import articlesPage from './components/Articles/articlesPage';
// import weather from './components/Weather/weather'
import messages from './components/Messages/messages';

import apiKeys from '../db/apiKeys.json';
import './index.scss';

const bindComponents = () => {
  // weather.weatherComponent();
  messages.initMessages();
  articlesPage.articleComponent();
};

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.autheEvents();
  users.usersEvents();
  navbar.buildNavbar();
  navbar.navbarEvents();
  authHelper.checkLoginStatus(bindComponents);
};

initialize();
