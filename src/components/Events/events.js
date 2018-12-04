import eventsData from '../Events/EventsData/eventsData';

const eventsStringBuilder = (events) => {
  let eventString = '<h3>Events:</h3>';
  events.forEach((event) => {
    eventString += `<h5>${event.name} ${event.Date} ${event.location}</h5>`;
  });
  return eventString;
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

export default { eventsPage, eventsStringBuilder };
