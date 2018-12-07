import $ from 'jquery';
import authHelpers from '../Helpers/authHelpers';
import weatherData from '../Helpers/Data/weatherData';

const buildWeatherHeader = () => {
  const domString = '<h2>Weather</h2>';
  $('#weather-header').html(domString);
};

const buildDropdown = (weatherArray) => {
  let domString = `<div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (weatherArray.length) {
    weatherArray.forEach((weather) => {
      domString += `<div id="${weather.id}" class="dropdown-item get-zip" data-dropdown-zipcode=${weather.zipcode}>${weather.zipcode}</div>`;
    });
  } else {
    domString += '<div class="dropdown-item">You have no locations.</div>';
  }
  domString += '</div></div>';
  $('#dropdown-container').html(domString);
};

const printWeatherApi = (weather, locationId) => {
  const domString = `<button id="edit-zipcode-button">Edit</button>
    <button id="delete-zipcode-button" data-zip-id="${locationId}">X</button>
    <p>${weather.city_name}, ${weather.state_code}<p>
    <p><img src="https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png"> ${weather.weather.description}<p>`;
  $('#weather-container').html(domString);
};

const weatherComponent = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllWeatherObjects(uid)
    .then((weatherArray) => {
      $('#weather-container').html('');
      buildDropdown(weatherArray);
    })
    .catch((error) => {
      console.error('error in weatherComponent', error);
    });
};

const weatherApi = (e) => {
  const zipcode = e.target.dataset.dropdownZipcode;
  const locationId = e.target.id;
  weatherData.getWeatherApi(zipcode)
    .then((weather) => {
      printWeatherApi(weather, locationId);
    })
    .catch((error) => {
      console.error('error on weatherApi', error);
    });
};

const deleteZip = (e) => {
  const idToDelete = e.target.dataset.zipId;
  weatherData.deleteLocation(idToDelete)
    .then(() => {
      weatherComponent();
    })
    .catch((error) => {
      console.error('error on deleteZip', error);
    });
};

$('body').on('click', '.get-zip', weatherApi);
$('body').on('click', '#delete-zipcode-button', deleteZip);


export default { weatherComponent, weatherApi, buildWeatherHeader };
