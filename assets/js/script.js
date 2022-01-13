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



