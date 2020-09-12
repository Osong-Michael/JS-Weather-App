// eslint-disable-next-line import/no-cycle
import { apiKey, apiURL, displayForecast } from './index';


function displayResult(results) {
  const lists = [...results.list];
  const newList = [];
  for (let i = 1; i < 4; i += 1) {
    newList.push(lists[i]);
  }
  displayForecast(newList);
}


function forecast(city) {
  fetch(`${apiURL}forecast?q=${city}&units=metric&APPID=${apiKey}`)
    .then(result => result.json()).then(displayResult);
}


export default forecast;