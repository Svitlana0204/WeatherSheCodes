let now = new Date();

let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let year = now.getFullYear();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let month = months[now.getMonth()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${hour}:${minute}, (${month}, ${date}, ${year})`;

let openWeatherMapAPIKey = "01ffd44a26b4a87ce4a2321873649875";

function getTemperature(city) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherMapAPIKey}`)
    .then(response => response.json())
    .then(data => data.main.temp);
}

function showSelectedCity(event) {
  event.preventDefault();
  const cityInput = document.querySelector("#cityDataList");

  if (!cityInput.value) {
    alert("Please, type a city");
    return;
  }

  let usersCityElement = document.querySelector(".usersCity");
  usersCityElement.innerHTML = cityInput.value;

  let temperatureElement = document.querySelector("#currentTemperature");

  getTemperature(cityInput.value).then(temperature => {
    temperatureElement.innerHTML = `${Math.round(temperature)} C`;
  });
}

let selectedCity = document.querySelector("#search-form");
selectedCity.addEventListener("submit", showSelectedCity);
