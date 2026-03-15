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
  let date = new Date(response.data.time * 1000);
  let icon = `<img  src="${response.data.condition.icon_url}">`;

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
}

//Converts time into date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dates = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dates[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function inputCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");
  let city = searchInput.value;

  searchCity(city);
}
function displayForecast() {
  let day = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "";

  day.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="Day1">
          <div class="forecast-date">${day}</div>
          <div class="forecast-icon">☀️</div>
          <div class="forecast-temps">
            <div class="forecast-temp">34°</div>
            <div class="forecast-temp">54°</div>
          </div>
        </div>`;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let SearchFormInput = document.querySelector("#search-bar");
SearchFormInput.addEventListener("submit", inputCity);

searchCity("Washington");
displayForecast();
