// Author: Marco Crank
// Purpose: Handle all the Displaying and events related to the userName feature of the app.

import $ from 'jquery';
import 'bootstrap';
import './messages.scss';
// import usersData from '../Helpers/Data/usersData';

const msgOutput = () => {
  let newMsgString = `
  <div class="messages mt-5">
  <div class="msg-history">
  `;
  // If NOT my UID then it is incoming
  newMsgString += `
  <div class="incoming-msg">
    <div class="incoming-msg-img"> <img alt="sunil" src="https://ptetutorials.com/images/user-profile.png"> </div>
    <div class="received-msg">
      <div class="received-width-msg">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt inventore quod beatae blanditiis, eos molestias ipsam pariatur voluptates unde eaque adipisci maxime repellendus obcaecati nesciunt dolor nam quaerat, at praesentium.</p>
        <span class="time-date"> 11:01 AM | June 9</span>
      </div>
    </div>
  </div>
  `;
  // If it is my UID then it is outgoing
  newMsgString += `
  <div class="outgoing-msg">
    <div class="outgoing-msg-img"> <img alt="sunil" src="https://ptetutorials.com/images/user-profile.png"> </div>
    <div class="sent-msg">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt inventore quod beatae blanditiis, eos molestias ipsam pariatur voluptates unde eaque adipisci maxime repellendus obcaecati nesciunt dolor nam quaerat, at praesentium.</p>
      <span class="time-date"> 11:01 AM | June 9 <i class="msg-del far fa-trash-alt fa-lg ml-2"></i><i class="msg-edit fas fa-edit fa-lg mr-2"></i></span>
    </div>
  </div>
  <div class="outgoing-msg">
    <div class="outgoing-msg-img"> <img alt="sunil" src="https://ptetutorials.com/images/user-profile.png"> </div>
    <div class="sent-msg">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt inventore quod beatae blanditiis, eos molestias ipsam pariatur voluptates unde eaque adipisci maxime repellendus obcaecati nesciunt dolor nam quaerat, at praesentium.</p>
      <span class="time-date"> 11:01 AM | June 9 <i class="msg-del far fa-trash-alt fa-lg ml-2"></i><i class="msg-edit fas fa-edit fa-lg mr-2"></i></span>
    </div>
  </div>
  <div class="outgoing-msg">
    <div class="outgoing-msg-img"> <img alt="sunil" src="https://ptetutorials.com/images/user-profile.png"> </div>
    <div class="sent-msg">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt inventore quod beatae blanditiis, eos molestias ipsam pariatur voluptates unde eaque adipisci maxime repellendus obcaecati nesciunt dolor nam quaerat, at praesentium.</p>
      <span class="time-date"> 11:01 AM | June 9 <i class="msg-del far fa-trash-alt fa-lg ml-2"></i><i class="msg-edit fas fa-edit fa-lg mr-2"></i></span>
    </div>
  </div>
  <div class="outgoing-msg">
    <div class="outgoing-msg-img"> <img alt="sunil" src="https://ptetutorials.com/images/user-profile.png"> </div>
    <div class="sent-msg">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt inventore quod beatae blanditiis, eos molestias ipsam pariatur voluptates unde eaque adipisci maxime repellendus obcaecati nesciunt dolor nam quaerat, at praesentium.</p>
      <span class="time-date"> 11:01 AM | June 9 <i class="msg-del far fa-trash-alt fa-lg ml-2"></i><i class="msg-edit fas fa-edit fa-lg mr-2"></i></span>
    </div>
  </div>
  `;
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

export default { msgOutput };
