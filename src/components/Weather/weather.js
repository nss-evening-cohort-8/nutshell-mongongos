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
      domString += `<div id="${weather.id}" class="dropdown-item get-zip" data-is-current=${weather.isCurrent} data-dropdown-zipcode=${weather.zipcode}>${weather.zipcode}</div>`;
    });
  } else {
    domString += '<div class="dropdown-item">You have no locations.</div>';
  }
  domString += '</div></div>';
  $('#dropdown-container').html(domString);
};

const printWeatherApi = (weather, locationId, currentLocation) => {
  let domString = '';
  const isCurrent = currentLocation;
  if (isCurrent === 'true') {
    domString += `<input class="is-current-checkbox" data-zip-id="${locationId}" type="checkbox" id="is-current-zipcode-checkbox" checked>Current Location</input>`;
  } else {
    domString += `<input class="is-current-checkbox" data-zip-id="${locationId}" type="checkbox" id="is-current-zipcode-checkbox">Current Location</input>`;
  }
  domString += `<button id="delete-zipcode-button" data-zip-id="${locationId}">X</button>
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
      const currentLocation = weatherArray.filter(object => object.isCurrent === true);
      if (currentLocation[0] !== undefined) {
        const currentZipcode = currentLocation[0].zipcode;
        const isCurrentValue = 'true';
        const locationId = currentLocation[0].id;
        weatherData.getWeatherApi(currentZipcode)
          .then((weather) => {
            printWeatherApi(weather, locationId, isCurrentValue);
          })
          .catch((error) => {
            console.error('error on weatherApi', error);
          });
      } else {
        $('#weather-container').html('You have no current location selected');
      }
    })
    .catch((error) => {
      console.error('error in weatherComponent', error);
    });
};

const weatherApi = (e) => {
  const zipcode = e.target.dataset.dropdownZipcode;
  const currentLocation = e.target.dataset.isCurrent;
  const locationId = e.target.id;
  weatherData.getWeatherApi(zipcode)
    .then((weather) => {
      printWeatherApi(weather, locationId, currentLocation);
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

const fixCurrentLocation = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllWeatherObjects(uid)
    .then((weatherObjects) => {
      const currentLocation = weatherObjects.filter(object => object.isCurrent === true);
      console.log(currentLocation);
      if (currentLocation[0] !== undefined) {
        const currentLocationId = currentLocation[0].id;
        const isCurrentFalse = false;
        weatherData.patchCurrentLocation(currentLocationId, isCurrentFalse)
          .then(() => {
            weatherComponent();
          })
          .catch((error) => {
            console.error('error on patchCurrentLocation', error);
          });
      }
    })
    .catch((error) => {
      console.error('error on fixCurrentLocation', error);
    });
};

const updateCurrentLocation = (e) => {
  const locationId = e.target.dataset.zipId;
  const isCurrent = e.target.checked;
  fixCurrentLocation();
  weatherData.patchLocation(locationId, isCurrent)
    .then(() => {
      weatherComponent();
    })
    .catch((error) => {
      console.error('error on updateCurrentLocation', error);
    });
};

$('body').on('click', '.get-zip', weatherApi);
$('body').on('click', '#delete-zipcode-button', deleteZip);
$('body').on('change', '.is-current-checkbox', updateCurrentLocation);


export default { weatherComponent, weatherApi, buildWeatherHeader };
