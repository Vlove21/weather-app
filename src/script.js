function searchCity(city) {
  apiKey = "4tba4782084a6foabae1d06b62316bcd";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
  axios.get(apiUrl).then(refreshInfo);
}
function refreshInfo(response) {
  console.log(response);
  cityName = response.data;
}

function inputCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");

  let city = searchInput.value;

  searchCity(city);
}

let SearchFormInput = document.querySelector("#search-bar");
SearchFormInput.addEventListener("submit", searchCity);
