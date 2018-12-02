import $ from 'jquery';
import 'bootstrap';

const userNameModal = () => {
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
            <input type="text" id="username-input" class="form-control" placeholder="Username" required>
            <div><small id="validate-username"></small></div>
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

// $('#users-modal').on('show.bs.modal', () => {
//   $('#username-input').trigger('focus');
// });

export default { userNameModal };
