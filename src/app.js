function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#weather-condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "dc0776ed2bt8a0f5b553b1843b00ao7f";
let units = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=New york&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
