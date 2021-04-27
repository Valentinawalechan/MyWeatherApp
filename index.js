function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days =  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}
function showUpdate(timestamp) {
  let time= new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
 
}


//// FORECAST
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement=document.querySelector("#forecast-temp");
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) {
    if(index <5) {
  forecastHTML = forecastHTML + `
            <div class="col">
                <div class="card">
                    <span class="day-1">${formatDay(forecastDay.dt)}</span>
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="80px" />
                    <div class="card-body">
                        <p class="card-text">${Math.round(
            forecastDay.temp.max
          )}/${Math.round(
            forecastDay.temp.min
          )}°
                        </p>
                    </div>
                </div>
            </div>`;
          }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4afbca1ce928a5e5a3ce7cd865810e81";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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

document.querySelector(".sunrise").innerHTML = `${showUpdate(response.data.sys.sunrise*1000)} AM`;
document.querySelector(".sunset").innerHTML = `${showUpdate(response.data.sys.sunset*1000)} PM`;

let iconElement = document.querySelector("#icon");
iconElement.setAttribute(`src`, `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute(`alt`, response.data.weather[0].description);
getForecast(response.data.coord);
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
