var weatherinfo = $('#weather');
var searchInput = $("#cityText");
var cityNameEl = $("#cityName");
var weatherIconEl = $("#weather-icon");
var temperatureEl = $("#temperature");
var cloudinessEl = $("#cloudiness");
var apiKey = "723b345acdd52204dfb9a13e95119b61";
var starchart = $('#starChart');
var meteorShower = $('#meteors');

var lyrids = moment().from("2022/1/13", true);
var aquariids = moment().from("2022/5/07", true);
var sAquariids = moment().from("2022/07/30", true);
var capricornids = moment().from("2022/7/27", true);
var perseids = moment().from("2022/8/12", true);
var orionids = moment().from("2022/10/22", true);
var sTaurids = moment().from("2022/10/29", true);
var nTaurids = moment().from("2022/11/11", true);

$('#m1').text(lyrids);
$('#m2').text(aquariids);
$('#m3').text(sAquariids);
$('#m4').text(capricornids);
$('#m5').text(perseids);
$('#m6').text(orionids);
$('#m7').text(sTaurids);
$('#m8').text(nTaurids);

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


$('#apod').on('click', function () {
    document.location = 'apod.html';
})

//Search button event listener
$("#searchButton").on("click", function (event) {
    event.preventDefault();
    if (searchInput.val() === "") {
        alert("Please enter a city");
        return;
    } else {
        searchHistory.push(searchInput.val());
        localStorage.setItem("search", JSON.stringify(searchHistory));
    };
    getCityWeather(searchInput.val());
});

//Clear button event listener to clear the search history
$("#clearButton").on("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("search");
})


//obtain Geolocation
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
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    getLocationWeather(lat, lon);
}

function getLocationWeather(lat, lon) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(queryUrl)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (response) {
            cityNameEl.text(response.name);
            let weatherIcon = response.weather[0].icon;
            //Get weather icons from api request
            weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            weatherIconEl.attr("alt", response.weather[0].description);
            //Convert temp from deg K to deg F
            temperatureEl.text("Temperature: " + k2F(response.main.temp) + " °F");
            cloudinessEl.text("Cloudiness: " + response.clouds.all + "%");
        });
}
getLocation();

//Temperature conversion
function k2F(k) {
    return Math.floor((k - 273.15) * 1.8 + 32);
}



function getCityWeather(searchTerm) {
    let cityQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey;
    fetch(cityQueryUrl)
        .then(function (cityData) {
            console.log(cityData.status);
            return cityData.json();
        })
        .then(function (cityData) {
            cityNameEl.text(cityData.name);
            let weatherIcon = cityData.weather[0].icon;
            //Get weather icons from api request
            weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            weatherIconEl.attr("alt", cityData.weather[0].description);
            //Convert temp from deg K to deg F
            temperatureEl.text("Temperature: " + k2F(cityData.main.temp) + " °F");
            cloudinessEl.text("Cloudiness: " + cityData.clouds.all + "%");
        });
}



//Use lat/long to get location key
$.getJSON("http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=0q8znAyCHgfaN2OS3I5rUKa5s2gbg4x2&q=" + lat + "%2C" + lon, function (data) {

    var locationKey = data.Key

    //Get moon phase at current location
    $.getJSON("http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=0q8znAyCHgfaN2OS3I5rUKa5s2gbg4x2&details=true", function (data) {

        var newMoon = "images/new-moon.png"
        var waxingCrescent = "images/waxing-crescent.png"
        var firstQuarter = "images/first-quarter.png"
        var waxingGibbous = "images/waxing-gibbous.png"
        var fullMoon = "images/full-moon.png"
        var waningGibbous = "images/waning-gibbous.png"
        var lastQuarter = "images/last-quarter.png"
        var waningCrescent = "images/waning-crescent.png"

        var moonPhase = data.DailyForecasts[0].Moon.Phase
        if (moonPhase == "NewMoon") {
            $("#moon-phase-name").html("New Moon")
            $("#moon-phase-icon").attr("src", newMoon)

        }
        if (moonPhase == "WaxingCrescent") {
            $("#moon-phase-name").html("Waxing Crescent")
            $("#moon-phase-icon").attr("src", waxingCrescent)

        }
        if (moonPhase == "FirstQuarter") {
            $("#moon-phase-name").html("First Quarter")
            $("#moon-phase-icon").attr("src", firstQuarter)

        }
        if (moonPhase == "WaxingGibbous") {
            $("#moon-phase-name").html("Waxing Gibbous")
            $("#moon-phase-icon").attr("src", waxingGibbous)
        }
        if (moonPhase == "FullMoon") {
            $("#moon-phase-name").html("Full Moon")
            $("#moon-phase-icon").attr("src", fullMoon)

        }
        if (moonPhase == "WaningGibbous") {
            $("#moon-phase-name").html("Waning Gibbous")
            $("#moon-phase-icon").attr("src", waningGibbous)

        }
        if (moonPhase == "LastQuarter") {
            $("#moon-phase-name").html("Last Quarter")
            $("#moon-phase-icon").attr("src", lastQuarter)

        }
        if (moonPhase == "WaningCrescent") {
            $("#moon-phase-name").html("Waning Crescent")
            $("#moon-phase-icon").attr("src", waningCrescent)
        }
    })

})
