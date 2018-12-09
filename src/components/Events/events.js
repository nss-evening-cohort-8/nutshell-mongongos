import $ from 'jquery';
import 'bootstrap';
import eventsData from './EventsData/eventsData';
import authHelpers from '../Helpers/authHelpers';

const printSingleEvent = (event) => {
  const eventString = `
    <div>
        <h1>${event.event}</h1>
        <h3>${event.startDate}</h3>
        <p>${event.location}</p>
      <button class = "btn btn-danger delete-btn" data-delete-id=${event.userUid}>X</button>
      <button class = "btn btn-info edit-btn" data-edit-id=${event.userUid}>Edit</button>
  </div>
      `;
  $('#single-container').html(eventString);
  $('#single-container').hide();
};

// const printAllEvents = (allEventsArray) => {
//   let domString = `<h2>Events</h2>
// `;
//   allEventsArray.forEach((event) => {
//     domString += `
//     <div class="evnts-builder">
//       <button type="button" id="delete-event-button" class="btn btn btn-sm"
// data-delete-id=${event.id}>X</button>
//       <button type="button" id="edit-event-button" class="btn btn btn-sm
// edit-btn" data-edit-id=${event.id}>Edit</button>
//       <h5 class="event-event">&#9758 ${event.event}</h5>
//       <p class="event-location">${event.location}</p>
//       <a class="event-startDate" href="${event.startDate}" target="_blank"></a>
//     </button>
//     <div id="${event.id}"></div>
//     `;
//     $('#events-modal-container').html(domString);
//   });
// };

const getSingleEvent = (e) => {
  const eventId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  eventsData.getAllEvents(eventId)
    .then((getAllEvents) => {
      console.log('uid', uid);
      printSingleEvent(getAllEvents);
    })
    .catch((error) => {
      console.error('error in getting one event', error);
    });
};

const buildModal = (eventsArray) => {
  let modal = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#eventModal">
    Pick Event
  </button>
  <!-- Modal -->
  <div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventModalLabel">Events</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">`;
  if (eventsArray.length) {
    eventsArray.forEach((event) => {
      modal += `<div class="modal-item get-single" data-modal-id=${event.id}>${event.event}${event.location}${event.startDate}</div>
        <div class="modal-footer">
          <button type="button" class="btn delete-btn-event btn-danger" data-delete-id=${event.id}>X</button>
          <button type="button" class="btn edit-btn-event btn-primary" data-edit-id=${event.id}>/</button>
        </div>`;
    });
  } else {
    modal += '<div class = "modal-item">You have no events.</div>';
  }
  modal += `</div>
        </div>
        </div>;`;
  modal += '</div></div>';
  $('#events-modal-container').html(modal);
};
const eventsComponent = () => {
  const uid = authHelpers.getCurrentUid();
  eventsData.getAllEvents(uid)
    .then((eventsArray) => {
      buildModal(eventsArray);
    })
    .catch((error) => {
      console.error('error in getting events', error);
    });
};

const deleteEvent = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  eventsData.deleteEvent(idToDelete)
    .then(() => {
      eventsComponent();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting event', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleEvent);
  $('body').on('click', '.delete-btn-event', deleteEvent);
};

const initializeEventsPage = () => {
  eventsComponent();
  bindEvents();
};

export default initializeEventsPage;
