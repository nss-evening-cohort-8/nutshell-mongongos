// Author: Marco Crank
// Purpose: Handle all the Displaying and events related to the userName feature of the app.

import $ from 'jquery';
import 'bootstrap';
import './messages.scss';
import firebase from 'firebase/app';
import 'firebase/database';
import moment from 'moment';
import authHelpers from '../Helpers/authHelpers';
import messagesData from '../Helpers/Data/messagesData';

const scrollToBottom = () => {
  $('.msg-history').animate({ scrollTop: $('.msg-history').prop('scrollHeight') }, 0);
};

const msgOutput = (messagesArr) => {
  const currentUid = authHelpers.getCurrentUid();
  const currentProfilePic = authHelpers.getProfilePic();

  let newMsgString = `
  <div class="messages mt-5">
  <div class="msg-history">
  `;
  messagesArr.forEach((message) => {
    const msgtimeStamp = moment(message.timestamp).format('LTS');
    const msgDate = moment(message.timestamp).format('MMM D');
    if (message.userUid === currentUid) {
      // If it is my UID then it is outgoing
      newMsgString += `
      <div class="outgoing-msg">
        <div class="outgoing-msg-img"> <img alt="Test" src="${currentProfilePic}"> </div>
        <div class="sent-msg">
          <p>${message.message}</p>
          <span class="time-date"> ${msgtimeStamp} | ${msgDate} <i class="msg-del far fa-trash-alt fa-lg mx-2"></i><i class="msg-edit fas fa-edit fa-lg mr-2"></i></span>
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
      <input id="new-msg-input" class="write-msg" type="text" placeholder="Type a message">
      <button id="new-msg-button" class="msg-send-btn" type="button"><i class="fas fa-upload" aria-hidden="true"></i></button>
    </div>
  </div>
  `;
  $('#message-container').html(newMsgString);
  $('#message-input').html(newInputString);
  $('#new-msg-input').val('');
};

const realTimeUpdate = () => {
  firebase.database().ref('messages/')
    .on('value', (snap) => {
      const newMsgArray = [];
      const newMsgObj = snap.val();
      if (newMsgObj !== null) {
        Object.keys(newMsgObj).forEach((message) => {
          newMsgArray.push(newMsgObj[message]);
        });
        newMsgArray.sort((a, b) => moment(a.timestamp).unix() - moment(b.timestamp).unix());
      }
      msgOutput(newMsgArray);
      scrollToBottom();
    });
};

const printMessages = () => {
  messagesData.getAllMessages()
    .then((results) => {
      msgOutput(results);
      scrollToBottom();
    })
    .catch((error) => {
      console.error('An error occurred while retrieving messages from the DB', error);
    });
};

const saveUserMsg = () => {
  const msgObj = {
    isEdited: false,
    message: $('#new-msg-input').val(),
    timestamp: moment().format(),
    avatarUrl: authHelpers.getProfilePic(),
    userUid: authHelpers.getCurrentUid(),
  };
  messagesData.createUserMsg(msgObj)
    .then(() => {
    })
    .catch((error) => {
      console.error('There was a problem saving the message', error);
    });
  realTimeUpdate();
  $('#new-msg-input').focus();
};

// Message box Events
const msgBoxEvents = () => {
  $('body').on('keypress', '#new-msg-input', (e) => {
    if (e.key === 'Enter' && $('#new-msg-input').val() !== '') {
      saveUserMsg(e);
    }
  });

  $('body').on('click', '#new-msg-button', () => {
    if ($('#new-msg-input').val() !== '') {
      saveUserMsg();
    }
  });
};

const initMessages = () => {
  printMessages();
  realTimeUpdate();
  msgBoxEvents();
};

export default { initMessages };
