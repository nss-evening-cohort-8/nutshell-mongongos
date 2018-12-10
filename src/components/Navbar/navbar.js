// Authors: Marco Crank
// Purpose: Handle all the Displaying and events related to the Navbar in the Nutshell App.

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import $ from 'jquery';
import authHelpers from '../Helpers/authHelpers';

import './navbar.scss';

const buildNavbar = (requests) => {
  const domString = `
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><i class="far fa-sad-tear"></i><i class="fas fa-sad-tear"></i> Pathetic Connect</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a id="nav-friends" class="nav-link" href="#" data-toggle="modal" data-target="#losersModal"><i class="fas fa-users fa-lg mx-1"></i></i>Friends 
          <span class="badge badge-light" style='background-color:tomato; ${requests === 0 ? 'display:none;' : ''}'>${requests}</span></a>
        </li> 
        <li class="nav-item">
          <a id="nav-logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt fa-lg mx-1"></i>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  `;
  $('#nav-bar').html(domString);
};

const updateFriendsPending = () => {
  firebase.database().ref('friendRequests/')
    .on('value', (data) => {
      const requestsObject = data.val();
      const requestsArray = [];
      if (requestsObject != null) {
        Object.keys(requestsObject).forEach((request) => {
          requestsArray.push(requestsObject[request]);
        });
      }
      const uid = authHelpers.getCurrentUid();
      const myRequests = requestsArray.filter(request => request.friendUid === uid);
      let requests = myRequests.length;
      if (requests === undefined) {
        requests = 0;
      }
      buildNavbar(requests);
    });
};

const appLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      $('#nav-friends').hide();
      $('#nav-logout').hide();
    })
    .catch((err) => {
      console.error(err);
    });
};

const navbarEvents = () => {
  $('body').on('click', '#nav-logout', appLogout);
};

export default { buildNavbar, navbarEvents, updateFriendsPending };
