import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../Helpers/authHelpers';
import initializeEventsPage from '../events';
import eventsData from '../EventsData/eventsData';

const eventFormBuilder = (event) => {
  const form = `
    <div class="form-group">
      <label for="form-event-event">Event:</label>
      <input type="text" class="form-control " value ="${event.event}"id="form-event-event" placeholder="Titans Game">
    </div>
    <div class="form-group">
      <label for="form-event-location">Location:</label>
      <input type="text" class="form-control" value ="${event.location}" id="form-event-location" placeholder="NSS">
    </div>
    <div class="form-group">
    <label for="form-event-date">Date:</label>
    <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
    <input type="text" class="form-control" value ="${event.startDate}" id="form-event-date">
        <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker1"/>
        <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
        </div>
  </div>
  `;
  return form;
};

const gettingEventFromForm = () => {
  const event = {
    event: $('#form-event-event').val(),
    location: $('#form-event-date').val(),
    startDate: $('#form-event-location').val(),
    userUid: authHelpers.getCurrentUid(),
  };
  return event;
};

const buildAddFrom = () => {
  const emptyEvent = {
    event: '',
    startDate: '',
    location: '',
  };
  let domString = '<h2>Add New Event</h2>';
  domString += eventFormBuilder(emptyEvent);
  domString += '<button id="add-event">Add Event</button>';
  $('#add-edit-event').html(domString).show();
  // $('#events-container').hide();
};

const addNewEvent = () => {
  const newEvent = gettingEventFromForm();
  eventsData.createEventData(newEvent)
    .then(() => {
      $('#add-edit-event').html('').hide();
      $('#events-container').show();
      initializeEventsPage();
      eventFormBuilder();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const buildEventButton = () => {
  const domString = '<button id="add-event-button">+</button>';
  $('#event-button').html(domString);
  $('#add-event-button').on('click', buildAddFrom);
};

const showEditEventForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  eventsData.getSingleEvent(idToEdit)
    .then((singleEvent) => {
      let domString = '<h2>Edit Event</h2>';
      domString += eventFormBuilder(singleEvent);
      domString += `<button id="edit-event" data-single-edit-id=${singleEvent.id}>Save Event</button>`;
      $('#add-edit-event').html(domString).show();
      // $('#events-container').hide();
      $('#events-modal-container').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateEvent = (e) => {
  const updatedEvent = gettingEventFromForm();
  const eventId = e.target.dataset.singleEditId;
  eventsData.updateEvent(updatedEvent, eventId)
    .then(() => {
      $('#add-edit-event').html('').hide();
      // $('#single-container').html('');
      // $('#events-container').show();
      initializeEventsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};
$('body').on('click', '#add-event', addNewEvent);
$('body').on('click', '.edit-btn-event', showEditEventForm);
$('body').on('click', '#edit-event', updateEvent);

export default {
  buildAddFrom,
  gettingEventFromForm,
  buildEventButton,
  addNewEvent,
};
