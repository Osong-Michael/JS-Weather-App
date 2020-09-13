/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import forecast from './forecast';
import {
  day1, day1P, day2, day2P, day3, day3P, button, forecastDiv, icon, description,
} from './utils';

import userLoad from './user';

const locationName = document.getElementById('location-name');
const degFahr = document.getElementById('fahr');
const degCel = document.getElementById('celsius');
const speed = document.getElementById('speed');
const pressure = document.getElementById('pressure');
const apiKey = 'a6cd07c7544e20ce06689d0d815f4222';
const apiURL = 'https://api.openweathermap.org/data/2.5/';
const searchBar = document.getElementById('search-bar');


function convertToCel(temp) {
  const res = Math.round((temp * (9 / 5)) + 32);
  return res;
}

function setIcons(icon, iconID) {
  // eslint-disable-next-line no-undef
  const skycons = new Skycons({ color: 'white' });
  if (iconID === '01d') {
    skycons.set(icon, 'clear-day');
  } else if (iconID === '01n') {
    skycons.set(icon, 'clear-night');
  } else if (iconID === '02d') {
    skycons.set(icon, 'partly-cloudy-day');
  } else if (iconID === '02n') {
    skycons.set(icon, 'partly-cloudy-night');
  } else if (iconID === '03d' || iconID === '03n' || iconID === '04d' || iconID === '04n') {
    skycons.set(icon, 'cloudy');
  } else if (iconID === '09d' || iconID === '09n') {
    skycons.set(icon, 'rain');
  } else if (iconID === '10d' || iconID === '10n' || iconID === '11d' || iconID === '11n') {
    skycons.set(icon, 'sleet');
  } else if (iconID === '13d' || iconID === '13n') {
    skycons.set(icon, 'snow');
  } else {
    skycons.set(icon, 'fog');
  }
  skycons.play();
}


window.onload = () => {
  userLoad();
};

function apiError(error) {
  // eslint-disable-next-line no-alert
  alert(error);
}


function displayCity(weather) {
  locationName.textContent = `${weather.name}, ${weather.sys.country}`;
  degCel.textContent = `${Math.round(weather.main.temp)}°C`;
  degFahr.textContent = `${Math.round(convertToCel(weather.main.temp))}°F`;
  description.textContent = weather.weather[0].description;
  speed.textContent = `Humidity: ${weather.main.humidity}%`;
  pressure.textContent = `Pressure: ${weather.main.pressure}Pa`;
  const iconPic = weather.weather[0].icon;
  setIcons(icon, iconPic);
}

function getCity(city) {
  fetch(`${apiURL}weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then(weather => weather.json()).then(displayCity).catch((error) => {
      // Handle the error
      // eslint-disable-next-line no-console
      apiError(error);
    });
}

function searchCity(e) {
  if (e.keyCode === 13) {
    getCity(searchBar.value);
    forecast(searchBar.value);
    searchBar.value = '';
  }
}

searchBar.addEventListener('keypress', searchCity);
button.addEventListener('click', () => {
  forecastDiv.classList.toggle('d-none');
});


function newDay(time) {
  const today = new Date(time);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const realDate = tomorrow.toLocaleDateString();
  return realDate;
}


function dayToString(day) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const realDay = days[day];
  return realDay;
}


function displayForecast(list) {
  const days1 = list[0];
  const days2 = list[1];
  const days3 = list[2];
  day1P.textContent = `${Math.round(days1.main.temp)}°C | ${convertToCel(days1.main.temp)}°F`;
  day2P.textContent = `${Math.round(days2.main.temp)}°C | ${convertToCel(days2.main.temp)}°F`;
  day3P.textContent = `${Math.round(days3.main.temp)}°C | ${convertToCel(days3.main.temp)}°F`;
  const d1 = new Date(days1.dt_txt).getDay();
  const d2 = new Date(newDay(days2.dt_txt)).getDay();
  const lastDay = new Date(newDay(days2.dt_txt));
  const d3 = new Date(newDay(lastDay)).getDay();
  day1.textContent = dayToString(d1);
  day2.textContent = dayToString(d2);
  day3.textContent = dayToString(d3);
}


export {
  apiKey, apiURL, displayForecast, setIcons, convertToCel,
  locationName, degFahr, degCel, speed, pressure, apiError,
};