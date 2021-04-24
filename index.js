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
///sunrise sunset
function showUpdate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day} ${date} ${month}, ${hour}:${minutes}`;
//// FORECAST
function showForecast() {
  let forecastElement=document.querySelector("#forecast-temp");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function(day) {
  forecastHTML = forecastHTML + `
            <div class="col">
                <div class="card">
                    <span class="day-1">${day}</span>
                    <img src="http://openweathermap.org/img/wn/50d@2x.png" width="80px" />
                    <div class="card-body">
                        <p class="card-text"> 11°/4°
                        </p>
                    </div>
                </div>
            </div>`;
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// Search for a city

function showTemp(response) {
celsiusTemperature = response.data.main.temp;
document.querySelector(".MainCity").innerHTML = response.data.name;
document.querySelector(".currentTemperature").innerHTML = `${Math.round(response.data.main.temp)}`;
document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
document.querySelector("#wind").innerHTML =Math.round(response.data.wind.speed)
document.querySelector(".dayForecast").innerHTML =  response.data.weather[0].description;
document.querySelector("#max").innerHTML = `${Math.round(response.data.main.temp_max)}°`;
document.querySelector("#min").innerHTML = `/${Math.round(response.data.main.temp_min)}°`;

document.querySelector(".sunrise").innerHTML = `${showUpdate(response.data.sys.sunrise * 1000)} AM`;
document.querySelector(".sunset").innerHTML = `${showUpdate(response.data.sys.sunset * 1000)} PM`;

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
showForecast();