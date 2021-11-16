let cityNameData;
let storedCityResult = JSON.parse(localStorage.getItem("City")) || [];

for (let i = 0; i < storedCityResult.length; i++) {
    var addSearchedCityButtons = document.createElement("button");
    addSearchedCityButtons.setAttribute("class", "cityNames");
    addSearchedCityButtons.textContent = storedCityResult[i];
    console.log(storedCityResult[i]);
    $("#searchedCities").append(addSearchedCityButtons);
    addWeatherEventListener();
}

const getWeatherApi = function (cityNameData) {
    let openWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameData + "&appid=2526c93b28a34d747fa977b104c5695a";
    fetch(openWeatherAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.cod !== "200") {
            console.log("City not found, Try again");
            return;
        }
        getCityWeatherData(data.city.coord.lat, data.city.coord.lon);

    })
    .catch(err => console.log(err));
};
function addWeatherEventListener() {
    const presetCityBtns = document.querySelectorAll(".cityNameData");
    presetCityBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            cityNameData = e.target.innerText;
            getWeatherApi(cityNameData);
   
        });
    });
}
            const searchButton = document.getElementById("searchBtn");
            searchButton.addEventListener("click", function () {
                cityNameData = $("#cityInput").val();
                getWeatherApi(cityNameData);
                console.log(storedCityResult);
                storedCityResult.push(cityNameData);

            const addNewBtn = document.createElement("button");
            addNewBtn.setAttribute("class", "cityNameData");
            addNewBtn.textContent = cityNameData;
            $("#searchedCities").append(addNewBtn);
        
            localStorage.setItem("City", JSON.stringify(storedCityResult));
            addWeatherEventListener();
            


        });
  

        const getDateTime = function (time) {
            const randomDate = new Date();
            randomDate.setTime(time * 1000);
            let dd = randomDate.getDate();
            let mm = randomDate.getMonth() + 1;
            let y = randomDate.getFullYear();
            return mm + '/' + dd + '/' + y;

        }


        const getCityWeatherData = function (lat, lon) {
            let uvApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=2526c93b28a34d747fa977b104c5695a' + '&units=metric';
            fetch(uvApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $('.city-date-result').html(cityNameData + " (" + getDateTime(data.current.dt) + ")" + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city variable
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


        var expectedForecast = function (data) {
            $('.expectedForecast').empty();
            for (let i = 1; i < 6; i++) {
                var day = $("<div class='day'><div />")
                $(day).append(getDateTime(data.daily[i].dt));
                $(day).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
                $(day).append("<p>Temp: " + data.daily[i].temp.day + " °C</p>");
                $(day).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
                $(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
                $('.expectedForecast').append(day)
        
            };
        }