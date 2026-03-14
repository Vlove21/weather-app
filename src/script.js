function searchCity(city) {
  apiKey = "4tba4782084a6foabae1d06b62316bcd";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshInfo);
}
function refreshInfo(response) {
  let cityName = response.data.city;
  let temp = response.data.temperature.current;
  let farenTemp = Math.round((temp * 9) / 5 + 32);
  //let country = response.data.country;
  //let humidity = Math.round(response.data.temperature.humidity);
  // let feelsLike = response.data.temperature.feels_like;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityName;
  let tempElement = document.querySelector("#city-temp");
  tempElement.innerHTML = farenTemp;
}

function inputCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");
  let city = searchInput.value;

  searchCity(city);
}

let SearchFormInput = document.querySelector("#search-bar");
SearchFormInput.addEventListener("submit", inputCity);
