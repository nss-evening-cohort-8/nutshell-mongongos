// Author: Marco Crank
// Purpose: Handle all the Displaying and events related to the userName feature of the app.

import $ from 'jquery';
import 'bootstrap';
import usersData from '../Helpers/Data/usersData';

// Build the Modal if we have determined there is no Username for the existing User
const userNameModal = (userId) => {
  const newUsernameModal = `
  <div class="modal fade" id="users-modal" tabindex="-1" role="dialog" data-backdrop="false" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Please Enter a User Name</h5>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate>
            <input type="text" id="username-input" class="form-control" data-uid="${userId}" placeholder="Username" required>
            <input type="text" id="username-input-sanitized" class="form-control mt-2" disabled style="display: none;">
            <div id="validate-text"><small id="validate-username"></small></div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" id="username-save-btn" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `;
  $('#new-user-modal').html(newUsernameModal);
};

// This is a pretty big function.  Maybe break out the validation to its own function?
const createUserName = (e) => {
  // Handle "Enter Key" && Save Button Events
  if (e.target.id === 'username-save-btn') {
    e.preventDefault();
  }
  const sanitizedUser = $('#username-input-sanitized').val();
  const userInput = $('#username-input').val();
  const userId = $('#username-input').data('uid');
  if (userInput.length > 0) {
    $('#username-input').removeClass('is-invalid is-valid');
    usersData.isExistingUserName(sanitizedUser)
      .then((result) => {
        if (result) {
          // Username exists
          $('#username-input').addClass('is-invalid');
          $('#validate-text').html('<small class="text-danger" id="validate-username">User name Exists</small>');
        } else {
          // This is a VALID user so create it
          $('#username-input').addClass('is-valid');
          $('#validate-text').html('<small class="text-success" id="validate-username">User name is Valid</small>');
          // Create new user Object to send to Firebase
          const newUserObject = {
            userName: `${userInput}`,
            santizedUserName: `${sanitizedUser}`,
            uid: `${userId}`,
            friends: '',
          };
          // Pass the data to our Axios Create
          usersData.createUserData(newUserObject)
            .then(() => {
              // Want to refresh any user data here.  Like maybe a profile section on the Navbar?
              $('#users-modal').modal('hide');
            })
            .catch((error) => {
              console.error('An error occured creating a new user Object', error);
            });
        }
      })
      .catch((error) => {
        console.error('An error occurred while checking for an existing user name in the DB', error);
      });
  } else if (userInput.length === 0) {
    // Input field is empty so mark it as invalid
    $('#username-input').addClass('is-invalid');
    $('#validate-text').html('<small class="text-danger" id="validate-username">User name cannot be blank</small>');
  } else {
    // Things are looking okay so clear any valid/non valid classes and remove validation text
    $('#username-input').removeClass('is-invalid is-valid');
    $('#validate-text').html('');
  }
};

const sanitizeUserName = () => {
  const sanitizedUser = $('#username-input').val().toLocaleLowerCase();
  $('#username-input-sanitized').val(sanitizedUser);
};

const usersEvents = () => {
  // Only fire create event if it is the "Enter" key
  $('body').on('keypress', '#username-input', (e) => {
    if (e.key === 'Enter') {
      createUserName(e);
    }
  });

  // Click event for the save button on username Modal
  $('body').on('click', '#username-save-btn', createUserName);

  // Set the focus on the input box for the Modal
  $('body').on('shown.bs.modal', () => {
    $('#username-input').trigger('focus');
  });

  // Create sanitized username
  $('body').on('keyup', '#username-input', (e) => {
    if (e.key !== 'Enter') {
      sanitizeUserName(e);
    }
  });
};

export default { userNameModal, usersEvents };
