import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../Helpers/authHelpers';
import events from '../events';
import eventsData from '../EventsData/eventsData';

// const addEventModalFormBuilder = (event) => {
//   const domString = `<button type="button" class="btn btn-prima
// ry" data-toggle="modal" data-target="#eventModal">Add A New Event</button>
// <div class="modal fade" id="eventModal" tabindex="-1" role="di
// alog" aria-labelledby="eventModal" aria-hidden="true">
//   <div class="modal-dialog modal-dialog-centered" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="eventModalHeader">Complete the form below:</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//         <div class="modal-body">
//         <label for="form-event-event">Event:</label>
//         <input type="text" class="form-control " value ="${event.event}"
// id="form-event-event" placeholder="Titans Game">
//       </div>
//       <div class="form-group">
//         <label for="form-event-location">Location:</label>
//         <input type="text" class="form-control" value ="${event.location}"
// id="form-event-location" placeholder="NSS">
//       </div>
//       <div class="form-group">
//       <label for="form-event-date">Date:</label>
//       <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
//       <input type="text" class="form-control" value ="${event.startDate}"
// id="form-event-date">
//           <input type="text" class="form-control datetimepicker-input"
// data-target="#datetimepicker1"/>
//           <div class="input-group-append" data-target="#datetimepicker1"
//  data-toggle="datetimepicker">
//               <div class="input-group-text"><i class="fa fa-calendar"></i></div>
//           </div>
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//           <button type="button" id="save-new-event" class="btn btn-primary">Save changes</button>
//         </div>
//     </div>
//   </div>
// </div>
//     `;
//   $('#add-edit-event').html(domString);
// };
const eventCalendar = () => {
  $('#datetimepicker4').datepicker({ dateFormat: 'MM-DD-YYYY' });
};

const eventFormBuilder = (event) => {
  const form = `<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalHeader">Complete the form below:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
    <div class="container">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <div class="input-group date" id="datetimepicker4" data-target-input="nearest">
                <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker4" value ="${event.startDate}"id="form-event-date"/>
                    <div class="input-group-append" data-target="#datetimepicker4" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  `;
  return form;
};

/* <div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body"> */


const buildAddFrom = () => {
  const emptyEvent = {
    event: '',
    startDate: '',
    location: '',
  };
  let domString = '<h2>Add New Event</h2>';
  domString += eventFormBuilder(emptyEvent);
  domString += eventCalendar(emptyEvent);
  domString += '<button id="add-event">Add Event</button>';
  $('#add-edit-event').html(domString).show();
  // $('#events-container').hide();
};
const buildEventButton = () => {
  const domString = '<button id="add-event-button">+</button>';
  $('#event-button').html(domString);
  $('#add-event-button').on('click', buildAddFrom);
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

// const buildAddFrom = () => {
//   const emptyEvent = {
//     event: '',
//     startDate: '',
//     location: '',
//   };
//   let domString = '<h2>Add New Event</h2>';
//   domString += eventFormBuilder(emptyEvent);
//   domString += '<button id="add-event">Add Event</button>';
//   $('#add-edit-event').html(domString).show();
//   // $('#events-container').hide();
// };

const addNewEvent = () => {
  const newEvent = gettingEventFromForm();
  eventsData.createEventData(newEvent)
    .then(() => {
      $('#add-edit-event').html('').hide();
      $('#events-container').show();
      events.initializeEventsPage();
      eventFormBuilder();
      events.printAllEvents();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// const buildEventButton = () => {
//   const domString = '<button id="add-event-button">+</button>';
//   $('#event-button').html(domString);
//   $('#add-event-button').on('click', buildAddFrom);
// };

const showEditEventForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  eventsData.getSingleEvent(idToEdit)
    .then((singleEvent) => {
      let domString = '<h2>Edit Event</h2>';
      domString += eventFormBuilder(singleEvent);
      domString += `<button id="edit-event" data-single-edit-id=${singleEvent.id}>Save Event</button>`;
      // $('#add-edit-event').html(domString).show();
      $('#eventModal').html(domString).show();
      // $('#events-container').hide();
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
      $('#add-edit-event').hide();
      $('#eventModal').hide();
      // $('#single-container').html('');
      // $('#events-container').show();
      events.initializeEventsPage();
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
