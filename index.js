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

function displayCityTemperature(response){
let cityElement = document.querySelector("#city");
cityElement.innerHTML = `${query}`;
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

let dayElement = document.querySelector("#current-day");
dayElement.innerHTML = formatDay();

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatCurrentDate();

let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = formatTime();

let query = "Toms River";
let apiKey = "3a83dea443off10fb38c9ftb1fed0ac5";
let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
axios.get(cityUrl).then(displayCityTemperature);

