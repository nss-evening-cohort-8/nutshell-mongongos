import axios from 'axios';
import apiKeys from '../../../../db/apiKeys';
import losersData from '../../Helpers/Data/losersData';
import authHelpers from '../../Helpers/authHelpers';

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
      const singleEvent = result.data;
      console.log(singleEvent);
      singleEvent.id = eventId;
      resolve(singleEvent);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

const createEventData = eventsObject => axios.post(`${firebaseUrl}/events.json`, JSON.stringify(eventsObject));

const updateEvent = (eventObject, eventId) => axios.put(`${firebaseUrl}/events/${eventId}.json`, JSON.stringify(eventObject));

// This function made by Rich to filter events shown by friends list

const getAllEventsWithFriends = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?`)
    .then((results) => {
      const eventsObject = results.data;
      const eventsArray = [];
      if (eventsObject !== null) {
        Object.keys(eventsObject).forEach((eventId) => {
          eventsObject[eventId].id = eventId;
          eventsArray.push(eventsObject[eventId]);
        });
      }
      losersData.getMyLosers()
        .then((losers) => {
          const losersUids = [];
          losers.forEach((loser) => {
            losersUids.push(loser.uid);
          });
          const uid = authHelpers.getCurrentUid();
          const filt = eventsArray.filter(a => losersUids.includes(a.userUid) || a.userUid === uid);
          resolve(filt);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getAllEvents,
  createEventData,
  deleteEvent,
  getSingleEvent,
  updateEvent,
  getAllEventsWithFriends,
};
