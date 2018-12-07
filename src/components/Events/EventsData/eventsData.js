import axios from 'axios';
import apiKeys from '../../../../db/apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEvents = userId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="userUid"&equalTo="${userId}"`)
    .then((results) => {
      const eventsObject = results.data;
      const eventsArray = [];
      if (eventsObject !== null) {
        Object.keys(eventsObject).forEach((eventId) => {
          eventsObject[eventId].id = eventId;
          eventsArray.push(eventsObject[eventId]);
        });
      }
      resolve(eventsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleEvent = eventId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events/${eventId}.json`)
    .then((result) => {
      console.log('heyaaaa');
      const singleEvent = result.data;
      singleEvent.userUid = eventId;
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

const createEventData = eventsObject => axios.post(`${firebaseUrl}/events.json`, JSON.stringify(eventsObject));

const updateEvent = (eventObject, eventId) => axios.put(`${firebaseUrl}/events/${eventId}.json`, JSON.stringify(eventObject));

export default {
  getAllEvents,
  createEventData,
  deleteEvent,
  getSingleEvent,
  updateEvent,
};
