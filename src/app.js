function dateFormat(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    let days = ["Mon", "Tue", "Wed", "Thu"];
    days.forEach(function (day) {
        forecastHTML =  forecastHTML + `
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                alt="broken broken clouds day"
                width="60"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temp-high">18°</span>
                <span class="weather-forecast-temp-low">12°</span>
              </div>
            </div>` ;
    });
          forecastHTML =  forecastHTML + `</div>`


    forecastElement.innerHTML = forecastHTML;
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#weather-condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let dateElement = document.querySelector(".date-time");
    let iconElement = document.querySelector("#icon");

    celsiusTemp = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = dateFormat(response.data.time * 1000);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
    let apiKey = "dc0776ed2bt8a0f5b553b1843b00ao7f";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;    
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahrenheitConversion(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusConversion(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitConversion);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusConversion);

search("New York");
displayForecast();