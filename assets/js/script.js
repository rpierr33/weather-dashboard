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
function addWeatherEventListener() {
    const presetCityBtns = document.querySelectorAll(".cityNameData");
    presetCityBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            cityNameData = e.target.innerText;
            fetchWeather(cityNameData);
   
        });
    });
}
            const searchButton = document.getElementById("searchBtn");
            searchButton.addEventListener("click", function () {
                cityNameData = $("#cityInput").val();
                fetchWeather(cityNameData);
                console.log(storedCity);
                storedCity.push(cityNameData);

            const addNewBtn = document.createElement("button");
            addNewBtn.setAttribute("class", "cityNameData");
            addNewBtn.textContent = cityNameData;
            $("#searchedCities").append(addNewBtn);
        
            localStorage.setItem("City", JSON.stringify(storedCity));
            addWeatherEventListener();
            


        });
  

        const toDatetime = function (time) {
            const randomDate = new Date();
            randomDate.setTime(time * 1000);
            let dd = randomDate.getDate();
            let mm = randomDate.getMonth() + 1;
            let y = randomDate.getFullYear();
            return mm + '/' + dd + '/' + y;

        }