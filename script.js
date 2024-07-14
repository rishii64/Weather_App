
function getWeather() {
    const API_Key = "2273319b9212321f0df6658649683d32";
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter city name !")
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_Key}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(err => {
            console.error("Error fetching weather data: ", err);
            alert("Error fetching weather data. Please try again.");
        })

    // fetch(forecastURL)
    //     .then(response => response.json())
    //     .then(hourlyData => displayHourlyForecast(hourlyData.list))
    //     .catch(err => {
    //         console.error("Error fetching hourly forecast: ", err);
    //         alert("Error fetching hourly forecast. Please try again.");
    //     })
}

const weatherImg = document.querySelector(".__weatherImg");
const tempDiv = document.querySelector(".__temperature");
const weatherInfo = document.querySelector(".__weather_Info");
const hourlyForecast = document.querySelector(".__hourlyForecast");

function displayWeather(data) {
    //clearing the previous content
    tempDiv.innerHTML = "";
    weatherInfo.innerHTML = "";
    hourlyForecast.innerHTML = "";

    if (data.cod === 200) {
        const weather_Code = data.weather[0].icon;
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const weather_Info = data.weather[0].description;
        const showTemperature = `<span>${temperature}</span>°C`;
        const showDescription = `<span>${cityName}</span>
        <p>${weather_Info}</p>`;

        weatherImg.src = `http://openweathermap.org/img/w/${weather_Code}.png`;
        tempDiv.innerHTML = showTemperature;
        weatherInfo.innerHTML = showDescription;

    }
    else {
        tempDiv.innerHTML = `<p>${data.message}</p>`;
    }
}

function displayHourlyForecast(hourlyData) {
    if (hourlyData.cod === 401) {
        tempDiv.innerHTML = `<p>${data.message}</p>`;
    }
    else {
        const next24Hours = hourlyData.slice(0, 8);

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 10800);
            const hours = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const weather_Code = item.weather[0].icon;
            const weather_Img = `https://openweathermap.org/img/wn/${weather_Code}@4x.png`;

            const showHourlyForecast = `<div class="hourlyData">
                <span>${hours}:00</span>
                <img src="${weather_Img}" alt="hourly weather icon>
                <span>${temperature}°C</span>
            </div>`
            hourlyForecast.innerHTML += showHourlyForecast;
        })
    }
}
