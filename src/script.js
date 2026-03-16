function searchCity(city) {
  apiKey = "4tba4782084a6foabae1d06b62316bcd";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshInfo);
}
function refreshInfo(response) {
  //All of the information to be refreshed
  let cityName = response.data.city;
  let countryName = response.data.country;
  let temp = response.data.temperature.current;
  let farenTemp = Math.round((temp * 9) / 5 + 32);
  let humidity = Math.round(response.data.temperature.humidity);
  let feelsLike = Math.round(
    (response.data.temperature.feels_like * 9) / 5 + 32,
  );
  let windSpeed = Math.round(response.data.wind.speed);
  let date = response.data.time * 1000;
  let icon = `<img  src="${response.data.condition.icon_url}">`;
  let conditions = response.data.condition.description;

  //Selects the elements
  let cityElement = document.querySelector("#city");
  let humidElement = document.querySelector("#humid");
  let tempElement = document.querySelector("#city-temp");
  let windElement = document.querySelector("#wind-speed");
  let countryElement = document.querySelector("#country");
  let feelsLikeElement = document.querySelector("#actual-temp");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  //Changes the HTML
  cityElement.innerHTML = cityName;
  countryElement.innerHTML = countryName;
  humidElement.innerHTML = humidity;
  tempElement.innerHTML = farenTemp;
  dateElement.innerHTML = formatDate(date);
  windElement.innerHTML = windSpeed;
  feelsLikeElement.innerHTML = feelsLike;
  iconElement.innerHTML = icon;

  getForecast(cityName);
  getConditions(conditions, cityName);
}

function getConditions(conditions, city) {
  console.log(conditions);
  let conditionPics = document.querySelector("#conditions-pics");
  let rainy = `<img src = "https://i0.wp.com/www.longbeachlocalnews.com/wp-content/uploads/IMG_5750.jpeg?fit=690%2C388&ssl=1" class= "conditions-pic" />`;
  let windy = `<img src = "https://wach.com/resources/media2/16x9/1280/986/0x66/90/a156e677-9c7b-45f0-8229-920ad987af6f-WindyPalms.jpg" class= "conditions-pic" />`;
  let sunny = `<img src = "https://blog.joffeemergencyservices.com/hubfs/maxresdefault.jpg" class= "conditions-pic" />`;
  let storm = `<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Lightning_Pritzerbe_01_%28MK%29.jpg/960px-Lightning_Pritzerbe_01_%28MK%29.jpg" class= "conditions-pic" />`;
  let cloudy = `<img src = "https://images2.minutemediacdn.com/image/upload/c_fill,w_2160,ar_16:9,f_auto,q_auto,g_auto/shape%2Fcover%2Fsport%2FiStock-104472907-ec1d53a7c5724086414f13ae0dab8e1b.jpg" class="conditions-pic"/>`;
  let snow = `<img src = "https://www.skisoutheast.com/wp-content/uploads/2016/11/2016-november-03-how-snowy.jpg" class= "conditions-pic" />`;
  let conditionElement = document.querySelector("#current-conditions");
  conditionElement.innerHTML = `There is currently ${conditions} in ${city}`;

  if (conditions.includes("rain")) {
    conditionPics.innerHTML = rainy;
  }
  if (conditions.includes("mist")) {
    conditionPics.innerHTML = rainy;
  }
  if (conditions.includes("wind")) {
    conditionPics.innerHTML = windy;
  }
  if (conditions.includes("clear")) {
    conditionPics.innerHTML = sunny;
  }
  if (conditions.includes("sunny")) {
    conditionPics.innerHTML = sunny;
  }
  if (conditions.includes("clouds")) {
    conditionPics.innerHTML = cloudy;
  }
  if (conditions.includes("storm")) {
    conditionPics.innerHTML = storm;
  }
  if (conditions.includes("snow")) {
    conditionPics.innerHTML = snow;
  }
}
//Converts time into date
function formatDate(date) {
  let newDate = new Date(date);
  let minutes = newDate.getMinutes();
  let hours = newDate.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let dates = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dates[newDate.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes} ${ampm}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function inputCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");
  let city = searchInput.value;

  searchCity(city);
}

function getForecast(city) {
  let apiKey = "4tba4782084a6foabae1d06b62316bcd";
  let forecastApi = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(forecastApi).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="Day">
          <div class="forecast-date">${formatDay(day.time)}</div>
          <img class="forecast-icon" src="${day.condition.icon_url}"/>
          <div class="forecast-temps">
            <div class="forecast-temp"><strong>${Math.round((day.temperature.minimum * 9) / 5 + 32)}°</strong></div>
            <div class="forecast-temp">${Math.round((day.temperature.maximum * 9) / 5 + 32)}°</div>
          </div>
        </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let SearchFormInput = document.querySelector("#search-bar");
SearchFormInput.addEventListener("submit", inputCity);

searchCity("Washington");
