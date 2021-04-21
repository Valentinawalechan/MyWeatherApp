let currentday = document.querySelector(".date");
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hour = now.getHours();
if(hour <10){
  hour = `0${hour}`
};
let minutes = now.getMinutes();
if(minutes <10) {
  minutes =`0${minutes}`
}

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day} ${date} ${month}, ${hour}:${minutes}`;


// Search for a city

function showTemp(response) {
celsiusTemperature = response.data.main.temp;
document.querySelector(".MainCity").innerHTML = response.data.name;
document.querySelector(".currentTemperature").innerHTML = `${Math.round(response.data.main.temp)}`;
document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
document.querySelector("#wind").innerHTML =Math.round(response.data.wind.speed)
document.querySelector(".dayForecast").innerHTML =  response.data.weather[0].description;

let iconElement = document.querySelector("#icon");
iconElement.setAttribute(`src`, `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.Element.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
let apiKey = "4afbca1ce928a5e5a3ce7cd865810e81";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}


function searchCity(event) {
  event.preventDefault();//
  let city =  document.querySelector("#search-bar").value;
  search(city);

}


// Current location


function getLocation (position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4afbca1ce928a5e5a3ce7cd865810e81";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}


function getPosition(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(getLocation);
}




///
function showFahrenheit(event) {
let temperatureElement = document.querySelector(".currentTemperature");
let fahrenheitTemp = (celsiusTemperature * 9) / 5+32;
temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let typeCity = document.querySelector(".search");
typeCity.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#location-button");
currentButton.addEventListener("click", getPosition);



let fahrenheitLink = document.querySelector("#fahr");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#cel");
celsiusLink.addEventListener("click", showCelsius);

search("London");
