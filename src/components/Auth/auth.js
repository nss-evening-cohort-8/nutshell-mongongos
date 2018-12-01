import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const loginPage = () => {
  const loginPageString = `
  <div class="container d-flex justify-content-center">
    <div class="card bg-light my-5" style="max-width: 16.8rem;">
      <h4 class="text-center">Login</h4>
      <div class="card-body">
        <a href="#" class="sb sb-google sb-m-2 sb-fw" id="google">Sign in with Google</a>
      </div>
    </div>
  </div>
  `;
  $('#login-page').html(loginPageString);
};

const autheEvents = () => {
  $('body').on('click', '#google', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default { loginPage, autheEvents };
