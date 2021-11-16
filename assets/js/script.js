let cityNameData;
let storedCity = JSON.parse(localStorage.getItem("City")) || [];

for (let i = 0; i < storedCity.length; i++) {
    let addCityButtons = document.createElement("button");
    addCityButtons.setAttribute("class", "cityNameData");
    addCityButtons.textContent = storedCity[i];
    console.log(storedCity[i]);
    $("#searchedCities").append(addCityButtons);
    addWeatherEventListener();
}

let fetchWeather = function (cityNameData) {
    let weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameData + "&appid=2526c93b28a34d747fa977b104c5695a";
    fetch(weatherAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.cod !== "200") {
            console.log("City not found. Please try again");
            return;
        }
        getCityInfo(data.city.coord.lat, data.city.coord.lon);
    })
    .catch(err => console.log(err));
};

// Get the preset buttons to return weather information
function addWeatherEventListener() {
let presetCityButns = document.querySelectorAll(".cityNameData");
presetCityButns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        cityNameData = e.target.innerText;
        fetchWeather(cityNameData);
    });
});
}

// Search button
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
cityNameData = $("#cityRequest").val();
fetchWeather(cityNameData);
console.log(storedCity);
storedCity.push(cityNameData);

let addNewBtn = document.createElement("button");
addNewBtn.setAttribute("class", "cityNameData");
addNewBtn.textContent = cityNameData;
$("#searchedCities").append(addNewBtn);

localStorage.setItem("City", JSON.stringify(storedCity));
addWeatherEventListener();
});

// Create a function to get the date
let getDateTime = function (time) {
let randomDate = new Date();
randomDate.setTime(time * 1000);
let dd = randomDate.getDate();
let mm = randomDate.getMonth() + 1;
let y = randomDate.getFullYear();
return mm + '/' + dd + '/' + y;
}

// Create a container that contains the city, date, temp, wind, humidity and UV index
let getCityInfo = function (lat, lon) {
let uvApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=2526c93b28a34d747fa977b104c5695a' + '&units=metric';
fetch(uvApi)
.then(function (response) {
    return response.json();
}).then(function (data) {
    $('.city-date-result').html(cityNameData + " (" + getDateTime(data.current.dt) + ")" + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city letiable
    $('.temperature').text("Temp: " + data.current.temp + " °F");
    $('.wind').text("Wind: " + data.current.wind_speed + " MPH");
    $('.humidity').text("Humidity: " + data.current.humidity + " %");
    $('.uvIndex').html("UV Index: " + `<span class="btnColor">${data.current.uvi}</span>`);
    expectedForecast(data);

    if (data.current.uvi <= 2) {
        $(".btnColor").attr("class", "btn btn-success");
    };
    if (data.current.uvi > 2 && data.current.uvi <= 5) {
        $(".btnColor").attr("class", "btn btn-warning");
    };
    if (data.current.uvi > 5) {
        $(".btnColor").attr("class", "btn btn-danger");
    };

});
};

// TODO: Create a container with a 5-day forecast
let expectedForecast = function (data) {
$('.expectedForecast').empty();
for (let i = 1; i < 6; i++) {
let day = $("<div class='day'><div />")
$(day).append(getDateTime(data.daily[i].dt));
$(day).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
$(day).append("<p>Temp: " + data.daily[i].temp.day + " °C</p>");
$(day).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
$(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
$('.expectedForecast').append(day)

};
}