let cityName;
let storedCityResult = JSON.parse(localStorage.getItem("City")) || [];

for (let i = 0; i < storedCityResult.length; i++) {
    var addSearchedCityButtons = document.createElement("button");
    addSearchedCityButtons.setAttribute("class", "cityNames");
    addSearchedCityButtons.textContent = storedCityResult[i];
    console.log(storedCity[i]);
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

    })
    .catch(err => console.log(err));
};