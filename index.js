function formatDay(){
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let now = new Date();
let day = days[now.getDay()];
return (`${day}`);
}


function formatCurrentDate(){
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
  "Dec"
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
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayFeelsEmoji(response) {
  let feelsLikeEmoji = document.querySelector("#feels-emoji");
  let feelsLikeElement = document.querySelector("#feels");
  feelsLikeElement.innerHTML  = Math.round(response.data.temperature.feels_like);
  if (feelsLikeElement < 10) {
    feelsLikeEmoji.innerHTML = "☃";
  } else if (feelsLikeElement >= 10 && feelsLikeElement < 25) {
    feelsLikeEmoji.innerHTML = "🙂" ;
  } else {
    feelsLikeEmoji.innerHTML = "🏝";
  }
}

function displayCityTemperature(response){
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current);
let weatherDescriptionElement= document.querySelector("#weather-description");
weatherDescriptionElement.innerHTML = response.data.condition.description;
let iconElement = document.querySelector("#icon");
iconElement.innerHTML = response.data.condition.icon_url;
let windElement = document.querySelector("#wind-speed");
windElement.innerHTML = Math.round(response.data.wind.speed);
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.temperature.humidity;
celsiusTemperature = response.data.temperature.current;
displayFeelsEmoji(response);

}

function search(query){
let apiKey = "3a83dea443off10fb38c9ftb1fed0ac5";
let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
axios.get(cityUrl).then(displayCityTemperature);
}

function handleSearch(event){
  event.preventDefault();
  let query = document.querySelector("#search-field-form");
  search(query.value);
}

function displayFahrenheitTemperature(event){
  event.preventDefault();

let temperatureElement = document.querySelector("#temperature");
let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

celsiusLinkElement.classList.remove("active");
fahrenheitLinkElement.classList.add("active");
}

function displayCelsiusTemperature(event){
  event.preventDefault();

let temperatureElement = document.querySelector("#temperature")
temperatureElement.innerHTML = Math.round(celsiusTemperature);

fahrenheitLinkElement.classList.remove("active");
celsiusLinkElement.classList.add("active");
}

let dayElement = document.querySelector("#current-day");
dayElement.innerHTML = formatDay();

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatCurrentDate();

let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = formatTime();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let celsiusTemperature = null;

let fahrenheitLinkElement = document.querySelector("#fahrenheit-Link");
fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemperature);


let fahrenheitTemperature = null;

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", displayCelsiusTemperature);
search("Toms River");