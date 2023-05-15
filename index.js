function formatDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let day = days[now.getDay()];
  return `${day}`;
}

function formatCurrentDate() {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let month = months[now.getMonth()];
  return `${month} ${date}, ${year}`;
}

function formatTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let AmOrPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = hours + ":" + minutes + " " + AmOrPm;
  return time;
}

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">

              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" alt="" />

              <p class="forecast-temp">
                <span id="max-temperature-forecast">${Math.round(
                  forecastDay.temperature.minimum
                )}</span>
                °F | <span id="min-temperature-forecast">${Math.round(
                  forecastDay.temperature.maximum
                )}</span> °F
              </p>

              <p class="forecast-day">${forecastDate(forecastDay.time)}</p>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "3a83dea443off10fb38c9ftb1fed0ac5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function displayFeelsEmoji(response) {
  let feelsLikeEmoji = document.querySelector("#feels-emoji");
  let feelsLikeElement = document.querySelector("#feels");
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  if (feelsLikeElement < 10) {
    feelsLikeEmoji.innerHTML = "☃";
  } else if (feelsLikeElement >= 10 && feelsLikeElement < 25) {
    feelsLikeEmoji.innerHTML = "🙂";
  } else {
    feelsLikeEmoji.innerHTML = "🏝";
  }
}

function displayCityTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = response.data.condition.description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  displayFeelsEmoji(response);

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "3a83dea443off10fb38c9ftb1fed0ac5";
  let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(cityUrl).then(displayCityTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-field-form");
  search(city.value);
}

let dayElement = document.querySelector("#current-day");
dayElement.innerHTML = formatDay();

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatCurrentDate();

let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = formatTime();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

search("Toms River");