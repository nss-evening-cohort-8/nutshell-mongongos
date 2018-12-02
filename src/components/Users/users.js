import $ from 'jquery';
import 'bootstrap';
import usersData from '../Helpers/Data/usersData';

const userNameModal = (userId) => {
  const newUsernameModal = `
  <div class="modal fade" id="users-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Please Enter a User Name</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate>
            <input type="text" id="username-input" class="form-control" data-uid="${userId}" placeholder="Username" required>
            <div id="validate-text"><small id="validate-username"></small></div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" id="username-save-btn" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `;
  $('#new-user-modal').html(newUsernameModal);
};

const validateUsername = (e) => {
  const userInput = e.target;
  if (e.key === 'Enter' && userInput.value.length > 0) {
    $('#username-input').removeClass('is-invalid is-valid');
    usersData.isExistingUserName(userInput.value)
      .then((result) => {
        if (result) {
          // Username exists
          $('#username-input').addClass('is-invalid');
          $('#validate-text').html('<small id="validate-username">User name Exists</small>');
        } else {
          $('#username-input').addClass('is-valid');
          $('#validate-text').html('<small id="validate-username">User name is Valid</small>');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (e.key === 'Enter' && userInput.value.length === 0) {
    $('#username-input').addClass('is-invalid');
    $('#validate-text').html('<small id="validate-username">User name cannot be blank</small>');
  } else {
    $('#username-input').removeClass('is-invalid is-valid');
    $('#validate-text').html('');
  }
};

const createUserName = (e) => {
  e.preventDefault();
  const userInput = $('#username-input').val();
  const userId = $('#username-input').data('uid');
  console.log('UserId', userId);
  if (e.key === 'Enter' && userInput.value.length > 0) {
    $('#username-input').removeClass('is-invalid is-valid');
    usersData.isExistingUserName(userInput.value)
      .then((result) => {
        if (result) {
          // Username exists
          $('#username-input').addClass('is-invalid');
          $('#validate-text').html('<small id="validate-username">User name Exists</small>');
        } else {
          // This is a VALID user so create it
          $('#username-input').addClass('is-valid');
          $('#validate-text').html('<small id="validate-username">User name is Valid</small>');

          const newUserObject = {
            userName: `'${userInput}'`,
            uid: `'${userId}'`,
          };
          usersData.createUserData(newUserObject)
            .then(() => {
              console.log('Created a new user yo');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (e.key === 'Enter' && userInput.value.length === 0) {
    $('#username-input').addClass('is-invalid');
    $('#validate-text').html('<small id="validate-username">User name cannot be blank</small>');
  } else {
    $('#username-input').removeClass('is-invalid is-valid');
    $('#validate-text').html('');
  }

  const validUsername = $('#username-input').hasClass('is-valid');
  console.log('Is it a valid user?', validUsername);
  console.log('Clicked Save Button on Username Modal', validUsername);
};

const usersEvents = () => {
  $('body').on('keypress', '#username-input', validateUsername);
  $('body').on('click', '#username-save-btn', createUserName);
  $('body').on('shown.bs.modal', () => {
    $('#username-input').trigger('focus');
  });
};

export default { userNameModal, usersEvents };
