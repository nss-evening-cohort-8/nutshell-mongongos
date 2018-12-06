import $ from 'jquery';
import authHelpers from '../Helpers/authHelpers';
import weatherData from '../Helpers/Data/weatherData';
import weather from './weather';

const buildWeatherButtons = () => {
  const domString = `<button id="add-zipcode-button">+</button>
  <button id="delete-zipcode-button">X</button>`;
  $('#weather-buttons').html(domString);
};

const formBuilder = (locationObject) => {
  const form = `<input type="text" value="${locationObject.zipcode}" id="zipcode-input">`;
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
  let domString = '<h2>Add New Location</h2>';
  domString += formBuilder(emptyLocation);
  domString += '<button id="save-zipcode-button">Save Location</button>';
  $('#add-edit-zipcode').html(domString);
  $('#weather-container').html('');
  $('#dropdown-container').html('');
};


const addNewLocation = () => {
  const newLocation = getLocationFromForm();
  weatherData.postNewLocation(newLocation)
    .then(() => {
      $('#add-edit-zipcode').html('');
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
        console.error('zip code is not valid');
      } else {
        addNewLocation();
      }
    })
    .catch((error) => {
      console.error('error on validateZip', error);
    });
};

$('body').on('click', '#save-zipcode-button', validateZip);
$('body').on('click', '#add-zipcode-button', buildAddForm);

export default { buildAddForm, buildWeatherButtons };
