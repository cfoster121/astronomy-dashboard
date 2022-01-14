var weatherinfo = $('#weather');
var searchInput = $("#cityText");
var cityNameEl = $("#cityName");
var weatherIconEl = $("#weather-icon");
var temperatureEl = $("#temperature");
var cloudinessEl = $("#cloudiness");
var visibilityEl = $('#visibility');
var apiKey = "723b345acdd52204dfb9a13e95119b61";
var starchart = $('#starChart');
var meteorShower = $('#meteors');
var con1 = $('#img1');
var con2 = $('#img2');

$('#m1').text(moment().from("2022/4/22", true));
$('#m2').text(moment().from("2022/5/07", true));
$('#m3').text(moment().from("2022/07/30", true));
$('#m4').text(moment().from("2022/7/27", true));
$('#m5').text(moment().from("2022/8/12", true));
$('#m6').text(moment().from("2022/10/22", true));
$('#m7').text(moment().from("2022/10/29", true));
$('#m8').text(moment().from("2022/11/11", true));

$('#apod').on('click', function () {
    document.location = 'apod.html';
})

//Constellation Data
var month = moment().format("MMM");
console.log("month",month);
if(month == "Dec" || month == "Jan" || month == "Feb"){
    con1.attr("src",'./assets/Constellation/winter.jpg');
}else if (month == "Mar" || month == "Apr" || month == "May"){
    con1.attr("src",'./assets\Constellation/spring.jpg');
}else if (month == "Jun" || month == "Jul" || month == "Aug"){
    con1.attr("src",'./assets\Constellation/summer.jpg');
}else{
    con1.attr("src",'./assets/Constellation/Autumn.jpg');
}

//--------------------------------------------------------------------------------------------------------------------
//search City

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//show buttons for cities in local storage
for(let i = 0 ; i < searchHistory.length ; i++){
    var city = searchHistory[i].replace(" ", "+");
    var cityButton = $('<button type="button">');
    cityButton.text(searchHistory[i]);
    cityButton.addClass("bg-cyan-700 hover:bg-cyan-800 m-2 rounded cityButton capitalize");
    cityButton.attr("data-city", city);
    $('#searchedCities').append(cityButton);
}
//Event listener for pre-searched cities
$('#searchedCities').on('click', '.cityButton', function () {
    var city = $(this).text();
    console.log(city);
    fetchWeather(city);
})

//Search button event listener
$('#searchButton').on('click', function () {
    var searchInput = $('#cityText').val();
    if(!searchInput){
        $("#weather").html("Choose a city")

        var ny= $('<input type="button" value="New York" class="btn"/>');
        var ber= $('<input type="button" value="Berlin" class="btn"/>');
        var cai= $('<input type="button" value="Cairo" class="btn"/>');
        var tok= $('<input type="button" value="Tokyo" class="btn"/>');

        $("#weather").append(ny);
        $("#weather").append(ber);
        $("#weather").append(cai);
        $("#weather").append(tok);

        return;
    }
    fetchWeather(searchInput);
    $('#cityText').val("");
})
//Fetching Weather Data with Search Bar
var fetchWeather = function (cityInput) {
    var city = cityInput.replace(" ", "+");
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=e6a41f6fdcb53d621e32978ad90ef82f';
  
    //fetch weather
    fetch(requestUrl)
      .then(function (response) {
        console.log(response);
        return response.json()
  
      })
      .then(function (cityData) {
        if (cityData.message == "city not found") {
          alert("City Not Found")
          return;
        }
        //Conditional to check if the city is already in local storage or not
        if (!searchHistory.includes(cityInput)) {
          generateButton(cityInput, city);
        }
        console.log(cityData);
        cityNameEl.text(cityData.name);
        let weatherIcon = cityData.weather[0].icon;
        //Get weather icons from api request
        weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        weatherIconEl.attr("alt", cityData.weather[0].description);
        temperatureEl.text("Temperature: " + cityData.main.temp + " °F");
        cloudinessEl.text("Cloudiness: " + cityData.clouds.all + "%");
        visibilityEl.text("Visibility: " + cityData.visibility + " meters");

      })
}

//GENERATE BUTTON
var generateButton = function (cityInput, city) {
    //Add button and reset textbox
    var cityButton = $('<button type="button">');
    cityButton.text(cityInput);
    cityButton.addClass("bg-cyan-700 hover:bg-cyan-800 m-2 rounded cityButton capitalize");
    cityButton.attr("data-city", city)
  
    searchHistory.push(cityInput);
    localStorage.setItem("search", JSON.stringify(searchHistory));
  
    $('#searchedCities').append(cityButton);
  
}

//Clear button event listener to clear the search history
$("#clearButton").on("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("search");
    location.reload();
})

//------------------------------------------------------------------------------------------------------------------------------
//Geolocation

if(localStorage.getItem('lat') == null){
    //obtain Geolocation
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $('#geoError').text("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        localStorage.setItem("lat",lat);
        localStorage.setItem("lon",lon);

        getLocationWeather(lat, lon);
        getMoonData(lat,lon)
    }
}else{
    getLocationWeather(localStorage.getItem("lat"),localStorage.getItem("lon"));
    getMoonData(localStorage.getItem("lat"),localStorage.getItem("lon"));
}

//Using geolocation
function getLocationWeather(lat, lon) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    getWeather(queryUrl);
}

//Fetch Weather Data widh GEO
function getWeather(url){
    fetch(url)
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
            temperatureEl.text("Temperature: " + cityData.main.temp + " °F");
            cloudinessEl.text("Cloudiness: " + cityData.clouds.all + "%");
            visibilityEl.text("Visibility: " + cityData.visibility + " meters");
        });
}



//User opens page 
    // execute function to check local storage location
        // get lat/long/location from local storage if present and assign to variable
            // if values are not null (values are present - location name not required) 
                // execute all functions that require lat/long with local storage data
                    // getMoonLocation()
                    // other functions requiring lat/long
                    // append location information to page
            // if values are null
                // execute prompt user location function
                    // calls on getCurrentPosition function
                       // if successful  
                            // run lines 138-141
                            // store information in local storage
                        // if unsuccessful 
                            // temporary solution 
                                //if failed - notify user that location cannot be captured and set location to predermined values
                                    // set values to local storage/execute functions requiring lat and long
                            // execute displayUserInfoCapture() ***Stretch goal - not part of MVP***
                                // identify empty div
                                // populate empty div with 
                                    // call to action for user to enter in location
                                        // need input field
                                        // need variable pointing to form/input field
                                        // need event listener for form submission
                                        // once user submits form with location
                                            //execute fetch coords
                                                // user submits valid location 
                                                    // lat long returned
                                                        // execute get moon phase with lat/long as arguments
                                                        // set lat/long in local storage as well as location name
                                                // user submits invalid location
                                                    // execute generateOptionalUserLocations function
                                                        // targets empty div
                                                            // append text content saying invalid location and asking user to select from given options
                                                            // array of string values of locations
                                                            // iterate through array, generate buttons, text content, data attribute
                                                            // append buttons to unique div on page (optional-location-buttons)
        // global variable pointing to optional-locations-buttons div (empty parent div - will have buttons if user submits invalid location) ***Also part of stretch goal***
        // add event listener to optional-locations-buttons div
            // if something inside of div is clicked,
                // create variable pointing to button that was clicked (event parameter, this)
                    //event.target(data-location) ***look up syntax
                        //once we have event from button, excute fetchCoords

          // make pointer to input form
  // add event lister to it
  // grab a hold of input values when submitted
    // send input value to  fetchCoords funtion (london, san fran)
      // if all goes well - set lat/lon in location storage in addition to locaiton name (london, san fran)
      //if things do not go well 
        //append message to screen about selcting one of 7 option
          //nyc
          //london
          //sf
          // ...


function getMoonData (lat,lon){
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

}

$(document).ready( function () {
    $('#meteorTable').DataTable( {
        "ordering": false
    } );
} );
