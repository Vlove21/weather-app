function searchCity(city) {
  apiKey = "4tba4782084a6foabae1d06b62316bcd";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshInfo);
}
function refreshInfo(response) {
  console.log(response.data);

  //All of the information to be refreshed
  let cityName = response.data.city;
  let countryName = response.data.country;
  let temp = response.data.temperature.current;
  let farenTemp = Math.round((temp * 9) / 5 + 32);
  let humidity = Math.round(response.data.temperature.humidity);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let date = new Date(response.data.time * 1000);
  let icon = response.data.condition.icon_url;

  //Change the city, country, and Temp
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityName;
  let tempElement = document.querySelector("#city-temp");
  tempElement.innerHTML = farenTemp;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = countryName;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(date);

  //Changes the other infomartion
  let humidElement = document.querySelector("#humid");
  humidElement.innerHTML = humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = windSpeed;
  let feelsLikeElement = document.querySelector("#actual-temp");
  feelsLikeElement.innerHTML = feelsLike;
  let iconElement = document.querySelector("weather icon");
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

let SearchFormInput = document.querySelector("#search-bar");
SearchFormInput.addEventListener("submit", inputCity);

searchCity("Washington");
