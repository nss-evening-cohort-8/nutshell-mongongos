import eventsData from './EventsData/eventsData';
import authHelpers from '../Helpers/authHelpers';

const printSingleEvent = (event) => {
    const eventString = `
    <div>
        <h1>${event.event}</h1>
        <h3>${event.startDate}</h3>
        <p>${event.location}</p>
    </div>
      `;
    $('#single-container').html(eventString);
   };

   const getSingleEvent = (e) => {
    const eventId = e.target.dataset.dropdownId;
    const uid = authHelpers.getCurrentUid();
    eventsData.getSingleEvent(eventId)
    .then((singleEvent) => {
        console.log('uid', uid)
        printSingleEvent(singleEvent)
    })
      .catch((error) => {
        console.error('error in getting one event', error);
      });
  };

const buildDropDown = (eventsArray) => {
  let dropdown = `<div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Pick a Event
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (eventsArray.length) {
    eventsArray.forEach((event) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${event.userUid}>${event.name}</div>`;
    });
  } else {
    dropdown += '<div class = "dropdown-item">You have no events.</div>';
  }
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const eventsPage = () => {
  const uid = authHelpers.getCurrentUid();
  eventsData.getAllEvents(uid)
    .then((eventsArray) => {
      buildDropDown(eventsArray);
    })
    .catch((error) => {
      console.error('error in getting events', error);
    });
};

const bindEvents = () => {
    $('body').on('click', '.get-single', getSingleEvent);

const initializeEventsPage = () => {
    eventsPage();
    bindEvents();
};
export default initializeEventsPage;
