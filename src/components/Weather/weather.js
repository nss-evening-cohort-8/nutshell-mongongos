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
      domString += `<div class="dropdown-item" data-dropdown-id=${weather.id}>${weather.zipcode}</div>`;
    });
  } else {
    domString += '<div class="dropdown-item">You have no locations.</div>';
  }
  domString += '</div></div>';
  $('#dropdown-container').html(domString);
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

export default { weatherComponent };
