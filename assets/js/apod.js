//api key = TufhpyWHkOqJrSy0fUCfVdv9DXlZS3MHqLX0cazP

var photo = $('#apodPhoto');
var caption = $('#apodCaption')

requestUrl = 'https://api.nasa.gov/planetary/apod?api_key=TufhpyWHkOqJrSy0fUCfVdv9DXlZS3MHqLX0cazP'

fetch(requestUrl)
.then(function (response) {
  console.log(response);
  return response.json()

})
.then(function (data) {
    var image = data.url;
    var imagecaption = data.title;
    photo.attr('src',image);
    caption.text(imagecaption);
})