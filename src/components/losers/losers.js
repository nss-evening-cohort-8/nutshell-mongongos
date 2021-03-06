import $ from 'jquery';
import './losers.scss';
import losersData from '../Helpers/Data/losersData';
import authHelpers from '../Helpers/authHelpers';
import avatars from '../avatars/avatars';
import avatarsData from '../Helpers/Data/avatarsData';
import addEvents from '../Events/AddEditEvents/addEditEvents';
import articlesPage from '../Articles/articlesPage';
import initializeEventsPage from '../Events/events';

const bindComponents = () => {
  initializeEventsPage();
  articlesPage.initializeArticles();
  addEvents.buildEventButton();
};

// Event for user sending a friend request

const addOneLoserClicked = () => {
  $('.addOneLoserButton').on('click', (event) => {
    losersData.sendLoserRequest(event.target.dataset.loserKey)
      .then(() => {
        const sentString = `
        <p class='sentRequest'>Friend Request Sent</p>`;
        $(event.target).parent().append(sentString);
        $(event.target).remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Event for user going to avatar page

const addAvatarClicked = () => {
  $('#addAvatarButton').on('click', () => {
    // eslint-disable-next-line no-use-before-define
    avatarsBuilder();
  });
};

// Event for returning to friends page

const returnToLosers = () => {
  $('#losersBackButton').on('click', () => {
    // eslint-disable-next-line no-use-before-define
    losersBuilder();
  });
};

// Event for returning to friends page

const returnToLosersFromAvatars = () => {
  $('#avatarBackButton').on('click', () => {
    // eslint-disable-next-line no-use-before-define
    losersBuilder();
  });
};

// Event for user uploading an avatar

const uploadAvatarClicked = () => {
  $('#uploadAvatarButton').on('click', () => {
    avatarsData.addAvatar()
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        avatarsBuilder();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Event for user saving an avatar to profile

const selectAvatarClicked = () => {
  $('#selectAvatarButton').on('click', () => {
    avatars.selectAvatar(avatars.getSelectedAvatar())
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        losersBuilder();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Event for user going to add friends page

const addLosersClicked = () => {
  $('#addLosersButton').on('click', () => {
    losersData.getOtherLosers(authHelpers.getCurrentUid())
      .then((losers) => {
        const losersHeaderString = `<h5 class="modal-title" id='losersTitle'>Add a Friend</h5>
                                <button type='button' id='losersBackButton' class='btn btn-sm btn-secondary'>Return to friends</button>`;
        let loserString = `
                          <div class="modal-body row" id='losersDiv'>`;
        losers.forEach((loser) => {
          let avatar;
          if (loser.avatar === undefined) {
            avatar = 'https://firebasestorage.googleapis.com/v0/b/nutshell-mongos.appspot.com/o/mongongopic.jpg?alt=media&token=256d46f5-6eee-4bc8-8d09-dbcfe833bb2b';
          } else {
            // eslint-disable-next-line prefer-destructuring
            avatar = loser.avatar;
          }
          loserString += `<div class='oneLoserDiv col-4'>
                            <img class='oneLoserAvatar avatarImage' src='${avatar}'/>
                            <p class='oneLoserName'>${loser.userName}</p>
                            <button type='button' class='btn btn-info btn-sm addOneLoserButton' data-loser-key='${loser.key}'>+</button>
                          </div>`;
        });
        loserString += `
                        </div>`;
        $('#loserModalHeader').html(losersHeaderString);
        $('#losersBody').html(loserString);
        returnToLosers();
        addOneLoserClicked();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Builds the friends page and applys events

const losersBuilder = () => {
  const loserString = `
  <div class="modal-dialog" role="document">
    <div class="modal-content" id='losersContent'>
      <div class="modal-header" id='loserModalHeader'>
        <h5 class="modal-title" id='losersTitle'>Friends</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class='modal-body' id='losersBody'>
        <div>
          <button type='button' id='addLosersButton' class='btn btn-sm btn-info'>Add Friend</button>
          <button type='button' id='addAvatarButton' class='btn btn-sm btn-secondary'>Add Avatar</button>
        </div>
        <div class="modal-body row" id='losersDiv'>
        </div>
        <div class='modal-body' id='losersPendingDiv'>
        </div>
      </div>
    </div>
  </div>`;
  $('#losersModal').html(loserString);
  addLosersClicked();
  addAvatarClicked();
  // eslint-disable-next-line no-use-before-define
  initializeLosers();
};

// Builds the avatars page and applys events

const avatarsBuilder = () => {
  const avatarHeaderString = `<h5 class="modal-title" id='losersTitle'>Select an Avatar</h5>
                              <button type='button' id='avatarBackButton' class='btn btn-sm btn-secondary'>Return to friends</button>`;
  const avatarString = `<div class="input-group mb-3">
                          <div class="custom-file">
                            <input type="file" class="custom-file-input" id="addAvatarInput" accept='image/png, image/jpeg'/>
                            <label class="custom-file-label" for="addAvatarInput" aria-describedby="uploadAvatarButton">Upload an Avatar</label>
                          </div>
                          <div class="input-group-append">
                            <span class="input-group-text" id="uploadAvatarButton">Upload</span>
                          </div>
                        </div>
                        <h5 id='avatarsHeader'>Select From Existing Avatars</h5>
                        <div id='avatarSelectDiv'></div>
                        <button type='button' id='selectAvatarButton' class='btn btn-sm btn-info'>Save Selected Avatar</button>`;
  $('#loserModalHeader').html(avatarHeaderString);
  $('#losersBody').html(avatarString);
  avatars.selectAvatarBuilder();
  uploadAvatarClicked();
  selectAvatarClicked();
  returnToLosersFromAvatars();
};

// Event for user deleting a friend

const removeLoserClicked = () => {
  $('.removeLoserButton').on('click', (event) => {
    losersData.deleteLoser(event.target.dataset.loserUid)
      .then(() => {
        bindComponents();
        losersBuilder();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Event for user accepting a new friend

const acceptLoser = () => {
  $('.acceptLoser').on('click', (event) => {
    losersData.addLoserToUser(event.target.dataset.loserUid)
      .then(() => {
        bindComponents();
        losersBuilder();
      })
      .catch((err) => {
        console.log(err);
      });
    losersData.addUserToLoser(event.target.dataset.loserUid);
    losersData.completeRequest(event.target.dataset.loserUid);
  });
};

// Event for user declining a friend request

const declineLoser = () => {
  $('.declineLoser').on('click', (event) => {
    losersData.completeRequest(event.target.dataset.loserUid)
      .then(() => {
        losersBuilder();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Builds the pending friend requests section of the friends page and applys events

const pendingLoserRequests = () => {
  losersData.getPendingLosers(authHelpers.getCurrentUid())
    .then((requests) => {
      losersData.getUsersByRequests(requests)
        .then((pendingLosers) => {
          let pendingLoserString = '';
          pendingLosers.forEach((pendingLoser) => {
            const loserKey = Object.keys(pendingLoser)[0];
            let avatar;
            if (pendingLoser[loserKey].avatar === undefined) {
              avatar = 'https://firebasestorage.googleapis.com/v0/b/nutshell-mongos.appspot.com/o/mongongopic.jpg?alt=media&token=256d46f5-6eee-4bc8-8d09-dbcfe833bb2b';
            } else {
              // eslint-disable-next-line prefer-destructuring
              avatar = pendingLoser[loserKey].avatar;
            }
            pendingLoserString += `<div class='onePendingLoserDiv'>
                                    <img class='onePendingLoserAvatar avatarImage' src='${avatar}'/>
                                    <p class='onePendingLoserName'>${pendingLoser[loserKey].userName}</p>
                                    <button type='button' class='btn btn-success btn-sm acceptLoser' data-loser-uid='${pendingLoser[loserKey].uid}'>Accept</button>
                                    <button type='button' class='btn btn-danger btn-sm declineLoser' data-loser-uid='${pendingLoser[loserKey].uid}'>Decline</button>`;
          });
          $('#losersPendingDiv').html(pendingLoserString);
          acceptLoser();
          declineLoser();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Builds the friends list within the friends page and applys events

const losersListBuilder = () => {
  losersData.getMyLosers()
    .then((losersArray) => {
      let loserListString = '';
      losersArray.forEach((loser) => {
        let avatar;
        if (loser.avatar === undefined) {
          avatar = 'https://firebasestorage.googleapis.com/v0/b/nutshell-mongos.appspot.com/o/mongongopic.jpg?alt=media&token=256d46f5-6eee-4bc8-8d09-dbcfe833bb2b';
        } else {
          // eslint-disable-next-line prefer-destructuring
          avatar = loser.avatar;
        }
        loserListString += `<div class='oneLoserDiv col-4'>
                              <img class='oneLoserAvatar avatarImage' src='${avatar}'/>
                              <p class='oneLoserName'>${loser.userName}</p>
                              <button type='button' class='btn btn-danger btn-sm removeLoserButton' data-loser-uid='${loser.uid}'>Remove</button>
                            </div>`;
      });
      $('#losersDiv').html(loserListString);
      removeLoserClicked();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Refreshes friends page

const initializeLosers = () => {
  losersListBuilder();
  pendingLoserRequests();
};

const initializeAddLosers = () => {
  addLosersClicked();
};

export default {
  losersBuilder,
  losersListBuilder,
  addLosersClicked,
  addOneLoserClicked,
  pendingLoserRequests,
  acceptLoser,
  declineLoser,
  returnToLosers,
  initializeLosers,
  initializeAddLosers,
  addAvatarClicked,
  avatarsBuilder,
  selectAvatarClicked,
  uploadAvatarClicked,
};
