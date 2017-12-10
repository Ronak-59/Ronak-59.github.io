var bannerImage = document.getElementById('selectedFile');
var result = document.getElementById('res');
var img = document.getElementById('tableBanner');

// Add a change listener to the file input to inspect the uploaded file.
bannerImage.addEventListener('change', function() {
    var file = this.files[0];
    // Basic type checking.
    if (file.type.indexOf('image') < 0) {
        res.innerHTML = 'invalid type';
        return;
    }

    // Create a file reader
    var fReader = new FileReader();

    // Add complete behavior
    fReader.onload = function() {
        // Show the uploaded image to banner.
        img.src = fReader.result;

        // Save it when data complete.
        // Use your function will ensure the format is png.
        localStorage.setItem("imgData", getBase64Image(img));
        // You can just use as its already a string.
        // localStorage.setItem("imgData", fReader.result);
    };

    // Read the file to DataURL format.
    fReader.readAsDataURL(file);
});

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function fetchimage () {
    var dataImage = localStorage.getItem('imgData');
   // img.src = "data:image/png;base64," + dataImage;
    // If you don't process the url with getBase64Image, you can just use
    // img.src = dataImage;
}

// Call fetch to get image from localStorage.
// So each time you reload the page, the image in localstorage will be 
// put on tableBanner
fetchimage();

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'f5ef19ab65354264b7e4142cf019fa7b'
});

app.models.predict("bd367be194cf45149e75f01d59f77ba7", "https://samples.clarifai.com/food.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
