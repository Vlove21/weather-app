function searchCity(city) {
  apiKey = "4tba4782084a6foabae1d06b62316bcd";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshInfo);
}
function refreshInfo(response) {
  console.log(response.data);
  let cityName = response.data.city;
  let countryName = response.data.country;
  let temp = response.data.temperature.current;
  let farenTemp = Math.round((temp * 9) / 5 + 32);
  let humidity = Math.round(response.data.temperature.humidity);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  //Change the city, country, and Temp
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityName;
  let tempElement = document.querySelector("#city-temp");
  tempElement.innerHTML = farenTemp;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = countryName;

  //Changes the other infomartion
  let humidElement = document.querySelector("#humid");
  humidElement.innerHTML = humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = windSpeed;
  let feelsLikeElement = document.querySelector("#actual-temp");
  feelsLikeElement.innerHTML = feelsLike;
  let iconElement = document.querySelector("weather icon");
}

function inputCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");
  let city = searchInput.value;

  searchCity(city);
}

let SearchFormInput = document.querySelector("#search-bar");
SearchFormInput.addEventListener("submit", inputCity);
