function formatDate(timestamp){
let dayElement = document.querySelector("#current-day");
let dateElement = document.querySelector("#current-date");
let timeElement = document.querySelector("#current-time");
let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
let year = date.getFullYear();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[today.getDay()];
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
let month = months[today.getMonth()];
dayElement.innerHTML = (`${day}`);
timeElement.innerHTML = (`${hours}:${minutes}`);
dateElement.innerHTML = (`${month} ${day}, ${year}`);
}
let dateTimeElement = document.querySelector("#date");
dateTimeElement.innerHTML = formatDate(response.data.dt*1000);