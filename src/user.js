// import { apiKey, setIcons, convertToCel } from './index';
import { description, icon } from './utils';
import {
  locationName, degFahr, degCel, speed, pressure,
  apiKey, setIcons, convertToCel,
} from './index';


const userLoad = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const proxy = 'http://cors-anywhere.herokuapp.com/';

      fetch(`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
        // eslint-disable-next-line arrow-body-style
        .then(response => {
          return response.json();
        }).then(data => {
          // Set default element
          locationName.textContent = `${data.name}, ${data.sys.country}`;
          degCel.textContent = `${Math.round(data.main.temp)}°C`;
          degFahr.textContent = `${Math.round(convertToCel(data.main.temp))}°F`;
          description.textContent = data.weather[0].description;
          speed.textContent = `Humidity: ${data.main.humidity}%`;
          pressure.textContent = `Pressure: ${data.main.pressure}Pa`;
          const iconPic = data.weather[0].icon;
          setIcons(icon, iconPic);
        });
    });
  } else if (!navigator.geolocation) {
    // eslint-disable-next-line no-alert
    alert('Allow location services to see your current weather details');
  }
};

export default userLoad;