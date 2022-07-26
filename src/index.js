let temperatureCelsius = 19;
let showTemperatureInCelsius = true;
let now = new Date();

let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let year = now.getFullYear();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[now.getDay()];

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
    "Dec",
];
let month = months[now.getMonth()];

let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${hour}:${minute}, (${month}, ${date}, ${year})`;

let usersCityElement = document.querySelector(".usersCity");
let temperatureElement = document.querySelector("#currentTemperature");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#windSpeed");
let weatherDescriptionElement = document.querySelector("#weatherDescription");
let temperatureUnitsElement = document.querySelector("#temperatureUnits");
let weatherIconElement = document.querySelector("#weatherIcon");
let selectedCity = document.querySelector("#search-form");

let openWeatherMapAPIKey = "01ffd44a26b4a87ce4a2321873649875";

function getWeather(city) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherMapAPIKey}`
    ).then((response) => response.json());
}

function getTemperatureString(temperature) {
    if (showTemperatureInCelsius) {
        return `${Math.round(temperature)}`;
    } else {
        return `${Math.round((temperature * 9) / 5) + 32}`;
    }
}

function showSelectedCity(event) {
    event.preventDefault();
    const cityInput = document.querySelector("#cityDataList");

    if (!cityInput.value) {
        alert("Please, type a city");
        return;
    }

    usersCityElement.innerHTML = cityInput.value;

    getWeather(cityInput.value).then((weather) => {
        temperatureCelsius = weather.main.temp;
        let humidity = weather.main.humidity;
        let windSpeed = weather.wind.speed;
        let weatherDescription = weather.weather[0].description;
        let weatherIcon = weather.weather[0].icon;

        temperatureElement.innerHTML = getTemperatureString(temperatureCelsius);
        humidityElement.innerHTML = `Humidity - ${
            Math.round(humidity * 10) / 10
        }%`;
        windSpeedElement.innerHTML = `Wind speed - ${
            Math.round(windSpeed * 10) / 10
        } km/h`;
        weatherDescriptionElement.innerHTML = weatherDescription;
        weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    });
}

function changeTemperatureUnits() {
    showTemperatureInCelsius = !showTemperatureInCelsius;

    if (showTemperatureInCelsius) {
        temperatureUnitsElement.innerHTML = "C";
    } else {
        temperatureUnitsElement.innerHTML = "F";
    }

    temperatureElement.innerHTML = getTemperatureString(temperatureCelsius);
}

selectedCity.addEventListener("submit", showSelectedCity);
temperatureUnitsElement.addEventListener("click", changeTemperatureUnits);
