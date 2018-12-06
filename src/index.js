// Authors: Marco Crank
// Purpose: Entry point into the Nutshell App.

import firebase from 'firebase/app';
import 'bootstrap';
import navbar from './components/Navbar/navbar';
import auth from './components/Auth/auth';
import authHelper from './components/Helpers/authHelpers';
import losers from './components/losers/losers';
import users from './components/Users/users';
import articlesPage from './components/Articles/articlesPage';
import messages from './components/Messages/messages';
import weather from './components/Weather/weather';
import addDeleteWeather from './components/Weather/addDeleteWeather';
import apiKeys from '../db/apiKeys.json';
import './index.scss';

const bindComponents = () => {
  messages.initMessages();
  articlesPage.articleComponent();
  weather.weatherComponent();
  losers.losersBuilder();
  weather.buildWeatherHeader();
  addDeleteWeather.buildWeatherButtons();
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
