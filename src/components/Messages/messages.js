// Author: Marco Crank
// Purpose: Handle all the Displaying and events related to the userName feature of the app.

import $ from 'jquery';
import 'bootstrap';
import './messages.scss';
import moment from 'moment';
import authHelpers from '../Helpers/authHelpers';
import messagesData from '../Helpers/Data/messagesData';

const msgOutput = (messagesArr) => {
  const currentUid = authHelpers.getCurrentUid();
  const currentProfilePic = authHelpers.getProfilePic();
  console.log(currentUid, currentProfilePic);
  console.log(messagesArr);

  let newMsgString = `
  <div class="messages mt-5">
  <div class="msg-history">
  `;
  messagesArr.forEach((message) => {
    const msgtimeStamp = moment(message.timestamp).format('LT');
    const msgDate = moment(message.timestamp).format('MMM D');
    if (message.userUid === currentUid) {
      // If it is my UID then it is outgoing
      newMsgString += `
      <div class="outgoing-msg">
        <div class="outgoing-msg-img"> <img alt="Test" src="${currentProfilePic}"> </div>
        <div class="sent-msg">
          <p>${message.message}</p>
          <span class="time-date"> ${msgtimeStamp} | ${msgDate} <i class="msg-del far fa-trash-alt fa-lg ml-2"></i><i class="msg-edit fas fa-edit fa-lg mr-2"></i></span>
        </div>
      </div>
      `;
    } else {
      // If NOT my UID then it is incoming
      newMsgString += `
      <div class="incoming-msg">
        <div class="incoming-msg-img"> <img alt="Test2" src="${currentProfilePic}"> </div>
        <div class="received-msg">
          <div class="received-width-msg">
            <p>${message.message}</p>
            <span class="time-date"> ${msgtimeStamp} | ${msgDate}</span>
          </div>
        </div>
      </div>
      `;
    }
  });
  const newInputString = `
  <div class="type-msg">
    <div class="input-msg-write">
      <input class="write-msg" type="text" placeholder="Type a message">
      <button class="msg-send-btn" type="button"><i class="fas fa-upload" aria-hidden="true"></i></button>
    </div>
  </div>
  `;
  $('#message-container').html(newMsgString);
  $('#message-input').html(newInputString);
};

const printMessages = () => {
  messagesData.getAllMessages()
    .then((results) => {
      msgOutput(results);
    })
    .catch((error) => {
      console.error('An error occurred while retrieving messages from the DB', error);
    });
};

const initMessages = () => {
  printMessages();
};

export default { initMessages };
