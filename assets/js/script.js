var weatherinfo = $('#weather');
const searchInput = $("#cityText");
const cityNameEl = $(".cityName");
const weatherIconEl = $(".weather-icon");
const temperatureEl = $(".temperature");
const cloudinessEl = $(".cloudiness");
const apiKey = "723b345acdd52204dfb9a13e95119b61";

$('#apod').on('click', function () {
    document.location = 'apod.html';
})

//Search button event listener
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    if (searchInput.val() === "") {
        alert("Please enter a city");
        return;
    }
    searchHistory.push(searchInput.val());
    localStorage.setItem("search", JSON.stringify(searchHistory));
    getWeather(searchInput.val());
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        weatherinfo.text("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    weatherinfo.html("Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}

getLocation();

//Temperature conversion
function k2F(k){
    return Math.floor((k - 273.15)*1.8 +32);
}

function getDate(date){
    let currentDate = new Date(date*1000);
    console.log(currentDate);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // +1 because month returned by `getMonth()` method starts at 0 index!
    const year = currentDate.getFullYear();
    return month + "/" + day + "/" + year;
}

function getWeather(position) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey;
    fetch(queryUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(response){
        cityNameEl.text(response.name + " (" + getDate(response.dt) + ") ");
        let weatherIcon = response.weather[0].icon;
        //Get weather icons from api request
        weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        weatherIconEl.attr("alt", response.weather[0].description);
        //Convert temp from deg K to deg F
        temperatureEl.text("Temperature: " + k2F(response.main.temp) + " °F");
        cloudinessEl.text("Cloudiness: " + response.clouds.all + "%"); 
     });
}

function getWeather(position) {
    let coordsQueryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey;
    fetch(coordsQueryUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(response){
        cityNameEl.text(response.name + " (" + getDate(response.dt) + ") ");
        let weatherIcon = response.weather[0].icon;
        //Get weather icons from api request
        weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        weatherIconEl.attr("alt", response.weather[0].description);
        //Convert temp from deg K to deg F
        temperatureEl.text("Temperature: " + k2F(response.main.temp) + " °F");
        cloudinessEl.text("Cloudiness: " + response.clouds.all + "%"); 
     });
}

function getWeather(cityName) {
    let cityQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(cityQueryUrl)
      .then(function(cityData) {
        return cityData.json();
      })
      .then(function(cityData){
        cityNameEl.text(cityData.name + " (" + getDate(cityData.dt) + ") ");
        let weatherIcon = cityData.weather[0].icon;
        //Get weather icons from api request
        weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        weatherIconEl.attr("alt", cityData.weather[0].description);
        //Convert temp from deg K to deg F
        temperatureEl.text("Temperature: " + k2F(cityData.main.temp) + " °F");
        cloudinessEl.text("Cloudiness: " + cityData.clouds.all + "%"); 
     });
}

    