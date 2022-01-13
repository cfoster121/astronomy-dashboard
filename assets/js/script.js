var weatherinfo = $('#weather');
var starchart = $('#starChart');
var meteorShower = $('#meteors');
var searchCity = $('#searchButton');

var lyrids = moment().from("2022/1/13",true);
var aquariids = moment().from("2022/5/07",true);
var sAquariids = moment().from("2022/07/30",true);
var capricornids = moment().from("2022/7/27",true);
var perseids = moment().from("2022/8/12",true);
var orionids = moment().from("2022/10/22",true);
var sTaurids = moment().from("2022/10/29",true);
var nTaurids = moment().from("2022/11/11",true);

$('#m1').text(lyrids);
$('#m2').text(aquariids);
$('#m3').text(sAquariids);
$('#m4').text(capricornids);
$('#m5').text(perseids);
$('#m6').text(orionids);
$('#m7').text(sTaurids);
$('#m8').text(nTaurids);


$('#apod').on('click', function () {
    document.location = 'apod.html'
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
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    weatherinfo.html("Latitude: " + lat +"<br>Longitude: " + lon);

    return [lat, lon];
}

console.log(lat)

//Use lat/long to get location key
$.getJSON("http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=0q8znAyCHgfaN2OS3I5rUKa5s2gbg4x2&q=" + lat + "%2C" + lon, function(data){

    var locationKey = data.Key
  
//Get moon phase at current location
    $.getJSON("http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=0q8znAyCHgfaN2OS3I5rUKa5s2gbg4x2&details=true", function(data) {

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