import $ from 'jquery';
import authHelpers from '../Helpers/authHelpers';
import weatherData from '../Helpers/Data/weatherData';

const buildDropdown = (weatherArray) => {
  let domString = `<div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (weatherArray.length) {
    weatherArray.forEach((weather) => {
      domString += `<div class="dropdown-item get-zip" data-dropdown-zipcode=${weather.zipcode}>${weather.zipcode}</div>`;
    });
  } else {
    domString += '<div class="dropdown-item">You have no locations.</div>';
  }
  domString += '</div></div>';
  $('#dropdown-container').html(domString);
};

const printWeatherApi = (weather) => {
  const domString = `<p>${weather.city_name}, ${weather.state_code}<p>
  <p><img src='https://www.weatherbit.io/api/codes/${weather.weather.icon}'> ${weather.weather.description}<p>`;
  $('#weather-container').html(domString);
};

const weatherComponent = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllWeatherObjects(uid)
    .then((weatherArray) => {
      buildDropdown(weatherArray);
    })
    .catch((error) => {
      console.error('error in weatherComponent', error);
    });
};

const weatherApi = (e) => {
  const zipcode = e.target.dataset.dropdownZipcode;
  weatherData.getWeatherApi(zipcode)
    .then((weather) => {
      printWeatherApi(weather);
    })
    .catch((error) => {
      console.error('error on weatherApi', error);
    });
};

$('body').on('click', '.get-zip', weatherApi);

export default { weatherComponent, weatherApi };
