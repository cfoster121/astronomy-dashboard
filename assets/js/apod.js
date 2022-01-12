//api key = TufhpyWHkOqJrSy0fUCfVdv9DXlZS3MHqLX0cazP
requestUrl = 'https://api.nasa.gov/planetary/apod?api_key=TufhpyWHkOqJrSy0fUCfVdv9DXlZS3MHqLX0cazP'
fetch(requestUrl)
.then(function (response) {
  console.log(response);
  return response.json()

})
.then(function (data) {
    var image = data.hdurl;
    var caption = data.title;
    $('#apodPhoto').attr('src',image);
    $('#apidCaption').text(caption);
})