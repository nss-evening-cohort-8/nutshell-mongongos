import $ from 'jquery';
import './weather.scss';
import 'bootstrap';
import authHelpers from '../Helpers/authHelpers';
import weatherData from '../Helpers/Data/weatherData';
import weather from './weather';

const buildWeatherButtons = () => {
  const domString = '<a id="add-zipcode-button"><i class="far fa-plus-square"></i></a>';
  $('#weather-buttons').html(domString);
};

const formBuilder = (locationObject) => {
  const form = `<div class="d-flex justify-content-center"><input type="text" value="${locationObject.zipcode}" id="zipcode-input"></div>`;
  return form;
};

const getLocationFromForm = () => {
  const location = {
    userUid: authHelpers.getCurrentUid(),
    zipcode: $('#zipcode-input').val(),
    isCurrent: false,
  };
  return location;
};

const buildAddForm = () => {
  const emptyLocation = {
    zipcode: '',
  };
  let domString = '<h4 id="add-header">Add New Location</h4>';
  domString += formBuilder(emptyLocation);
  domString += '<button class="btn btn-secondary" id="save-zipcode-button">Save New Location</button>';
  domString += '<button class="btn btn-secondary" id="cancel-zipcode-button">Cancel</button>';
  $('#add-edit-zipcode').html(domString);
  $('#weather-container').html('');
  $('#dropdown-container').html('');
  $('#weather-buttons').hide();
  $('#zipcode-input').focus();
};


const addNewLocation = () => {
  const newLocation = getLocationFromForm();
  weatherData.postNewLocation(newLocation)
    .then(() => {
      $('#add-edit-zipcode').html('');
      $('#weather-buttons').show();
      weather.weatherComponent();
    })
    .catch((error) => {
      console.error('error on addNewLocation', error);
    });
};

const validateZip = () => {
  const newLocation = getLocationFromForm();
  const newZip = newLocation.zipcode;
  weatherData.getWeatherApi(newZip)
    .then((result) => {
      if (result === 'noData') {
        const alert = `<div class="alert alert-warning alert-dismissible fade show alert-danger" role="alert">
          Zip code is not valid, ya dummy!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
        $('#alert-zipcode').html(alert);
      } else {
        addNewLocation();
      }
    })
    .catch((error) => {
      console.error('error on validateZip', error);
    });
};

$('body').on('click', '#cancel-zipcode-button', () => {
  $('#add-edit-zipcode').html('');
  $('#weather-buttons').show();
  weather.weatherComponent();
});
$('body').on('click', '#save-zipcode-button', validateZip);
$('body').on('keyup', '#zipcode-input', (e) => {
  if (e.keyCode === 13) {
    validateZip();
  }
});
$('body').on('click', '#add-zipcode-button', buildAddForm);

export default { buildAddForm, buildWeatherButtons };
