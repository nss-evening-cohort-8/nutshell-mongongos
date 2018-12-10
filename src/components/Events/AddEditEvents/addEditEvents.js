import $ from 'jquery';
import 'bootstrap';
import '../events.scss';
import authHelpers from '../../Helpers/authHelpers';
import events from '../events';
import eventsData from '../EventsData/eventsData';

const eventFormBuilder = (event) => {
  const form = `<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalHeader">Complete the form:</h5>
        <button type="button" id="add-close-button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body"><div class="form-group">
      <label for="form-event-event">Event:</label>
      <input type="text" class="form-control " value ="${event.event}"id="form-event-event"
      placeholder="Titans Game">
    </div>
    <div class="form-group">
      <label for="form-event-location">Location:</label>
      <input type="text" class="form-control" value ="${event.location}" id="form-event-location"
      placeholder="NSS">
    </div>
    <div class="form-group">
    <label for="form-event-startDate">Date:</label>
    <input type="text" class="form-control" value ="${event.startDate}" id="form-event-startDate"
    placeholder="10/23/2001">
</div>
  `;
  return form;
};

const buildAddFrom = () => {
  const emptyEvent = {
    event: '',
    startDate: '',
    location: '',
  };
  // let domString = '<h5>Add New Event</h5>';
  let domString = eventFormBuilder(emptyEvent);
  domString += '<button id="add-event">Add Event</button>';
  $('#add-edit-event').html(domString).show();
};
const buildEventButton = () => {
  const domString = '<div id="add-event-button" class="far fa-plus-square"></div>';
  $('#event-button').html(domString);
  $('#add-event-button').on('click', buildAddFrom);
};

const gettingEventFromForm = () => {
  const event = {
    event: $('#form-event-event').val(),
    location: $('#form-event-location').val(),
    startDate: $('#form-event-startDate').val(),
    userUid: authHelpers.getCurrentUid(),
  };
  return event;
};

const addNewEvent = () => {
  const newEvent = gettingEventFromForm();
  eventsData.createEventData(newEvent)
    .then(() => {
      $('#add-edit-event').html('').hide();
      $('#events-container').show();
      events.initializeEventsPage();
      eventFormBuilder();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const showEditEventForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  eventsData.getSingleEvent(idToEdit)
    .then((singleEvent) => {
      let domString = '<h2>Edit Event</h2>';
      domString += eventFormBuilder(singleEvent);
      domString += `<button id="edit-event" data-single-edit-id=${singleEvent.id} data-dismiss="modal">Save Event</button>`;
      $('#eventModal').html(domString).show();
      $('#events-modal-container').show();
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
      $('#single-container').html('').hide();
      events.initializeEventsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const addCloseButton = () => {
  $('#add-edit-event').hide();
};

$('body').on('click', '#add-event', addNewEvent);
$('body').on('click', '#edit-btn-event', showEditEventForm);
$('body').on('click', '#edit-event', updateEvent);
$('body').on('click', '#add-close-button', addCloseButton);

export default {
  buildAddFrom,
  gettingEventFromForm,
  buildEventButton,
  addNewEvent,
};
