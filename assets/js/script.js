var weatherinfo = $('#weather');
var starchart = $('#starChart');
var meteorShower = $('#meteors');

var searchCity = $('#searchButton')

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

