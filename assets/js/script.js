var weatherinfo = $('#weather');

$('#apod').on('click', function () {
    document.location = 'apod.html'
})

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
}

getLocation();