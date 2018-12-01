// import firebase from 'firebase/app';
// import 'firebase/auth';
import $ from 'jquery';

import './navbar.scss';

// const navbarEvents = () => { };

const buildNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><i class="fas fa-mars fa-lg mr-2"></i>In A NutShell</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a id="nav-friends" class="nav-link" href="#"><i class="fas fa-users fa-lg mx-1"></i></i>Friends</a>
        </li>
        <li class="nav-item">
          <a id="nav-logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt fa-lg mx-1"></i>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  `;
  $('#nav-bar').html(domString);
  // navbarEvents();
};

export default { buildNavbar };
