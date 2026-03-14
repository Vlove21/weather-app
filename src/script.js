function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-city");
  let cityElement = document.querySelector("#city");
  let city = searchInput.value;
  cityElement.innerHTML = city;
}

let SearchFormInput = document.querySelector("#search-bar");
SearchFormInput.addEventListener("submit", searchCity);
