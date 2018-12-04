import $ from 'jquery';
import './losers.scss';
import losersData from './losersData';
import authHelpers from '../Helpers/authHelpers';

const addOneLoserClicked = () => {
  $('.addOneLoserButton').on('click', (event) => {
    losersData.sendLoserRequest(event.dataset.loserUid)
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

const addLosersClicked = () => {
  $('#addLosersButton').on('click', () => {
    losersData.getOtherLosers(authHelpers.getCurrentUid())
      .then((losers) => {
        let loserString = '';
        losers.forEach((loser) => {
          loserString += `<div class='oneLoserDiv'>
                            <img class='oneLoserAvatar' src='${loser.avatar}'/>
                            <p class='oneLoserName'>${loser.name}</p>
                            <button type='button' class='btn btn-info btn-sm addOneLoserButton' data-loser-uid='${loser.uid}'>+</button>
                          </div>`;
        });
        $('#losersTitle').text('Add a Friend');
        $('#losersBody').html(loserString);
        addOneLoserClicked();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const removeLoserClicked = () => {
  $('.removeLoserButton').on('click', (event) => {
    losersData.deleteLoser(event.target.dataset.loserUid);
  });
};

const acceptLoser = () => {
  $('.acceptLoser').on('click', (event) => {
    losersData.completeRequest(event.target.dataset.loserUid);
    losersData.addLoserToUser(event.target.dataset.loserUid);
  });
};

const declineLoser = () => {
  $('.declineLoser').on('click', (event) => {
    losersData.completeRequest(event.target.dataset.loserUid);
  });
};

const pendingLoserRequests = () => {
  losersData.getPendingLosers(authHelpers.getCurrentUid())
    .then((requests) => {
      losersData.getUsersByRequests(requests)
        .then((pendingLosers) => {
          let pendingLoserString = '';
          pendingLosers.forEach((pendingLoser) => {
            pendingLoserString += `<div class='onePendingLoserDiv'>
                                    <img class='onePendingLoserAvatar' src='${pendingLoser.avatar}'/>
                                    <p class='onePendingLoserName'>${pendingLoser.name}</p>
                                    <button type='button' class='btn btn-success btn-sm acceptLoser' data-loser-uid='${pendingLoser.uid}'>Accept</button>
                                    <button type='button' class='btn btn-danger btn-sm declineLoser' data-loser-uid='${pendingLoser.uid}'>Decline</button>`;
          });
          $('#losersPendingDiv').html(pendingLoserString);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const losersBuilder = () => {
  const loserString = `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id='losersTitle'>Friends</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class='modal-body' id='losersBody'>
        <div>
          <button type='button' id='addLosersButton' class='btn btn-sm btn-info'>Add Friend</button>
        </div>
        <div class="modal-body" id='losersDiv'>
        </div>
        <div class='modal-body' id='losersPendingDiv'>
        </div>
      </div>
    </div>
  </div>`;
  $('#losersModal').html(loserString);
  addLosersClicked();
};

const losersListBuilder = () => {
  losersData.getMyLosers()
    .then((losersArray) => {
      let loserListString = '';
      losersArray.forEach((loser) => {
        loserListString += `<div class='oneLoserDiv'>
                              <img class='oneLoserAvatar' src='${loser.avatar}'/>
                              <p class='oneLoserName'>${loser.name}</p>
                              <button type='button' class='btn btn-danger btn-sm removeLoserButton' data-loser-uid='${loser.uid}'>X</button>
                            </div>`;
      });
      $('#losersDiv').html(loserListString);
      removeLoserClicked();
    })
    .catch((err) => {
      console.log(err);
    });
};

const initializeLosers = () => {
  losersBuilder();
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
  initializeLosers,
  initializeAddLosers,
};
