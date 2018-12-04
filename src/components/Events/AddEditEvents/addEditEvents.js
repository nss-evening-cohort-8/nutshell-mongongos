import $ from 'jquery';
import authHelpers from '../../Helpers/authHelpers';

const formBuilder = (event) => {
  const form = `
    <div class="form-group">
      <label for="form-event-name">Name:</label>
      <input type="text" class="form-control" value ="${event.name}"id="form-friend-name" placeholder="John Smith">
    </div>
    <div class="form-group">
      <label for="form-event-date">Address:</label>
      <input type="text" class="form-control" value ="${event.date}" id="form-friend-address" placeholder="December 1st, 2018">
    </div>
    <div class="form-group">
    <label for="form-event-location">Email:</label>
    <input type="text" class="form-control" value ="${event.location}" id="form-friend-email" placeholder="NSS">
  </div>
  `;
  return form;
};

const gettingEventFromForm = () => {
  const event = {
    name: $('#form-event-name').val(),
    address: $('#form-event-date').val(),
    email: $('#form-event-location').val(),
    uid: authHelpers.getCurrentUid(),
  };
  return event;
};

const buildAddFrom = () => {
  const emptyEvent = {
    name: '',
    date: '',
    location: '',
  };
  let domString = '<h2>Add New Event</h2>';
  domString += formBuilder(emptyEvent);
  domString += '<button id="add-event">Add Event</button>';
  $('#add-edit-event').html(domString).show();
  $('#events').hide();
};

export default { buildAddFrom, gettingEventFromForm };
