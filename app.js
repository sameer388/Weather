const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const ejs = require("ejs");


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//Request for the home route

app.get("/", function (req, res) {
    // Get the data from the index.html
    const queries = "Mumbai";
    const appKey = "4c3506968ef04f5e5523545188e8a6c6";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queries + "&appid=" + appKey + "&units=" + unit;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            res.render("home", { weatherData: weatherData });
        });

    });
});



//We use the data here what user has input
app.post("/", function (req, res) {

    const queries = req.body.cityName;
    const appKey = "4c3506968ef04f5e5523545188e8a6c6";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queries + "&appid=" + appKey + "&units=" + unit;
    https.get(url, function (response) {
        if (response.statusCode != 200) {
            res.send("Please enter the correct city.");
        }
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            res.render("home", { weatherData: weatherData });
        });
    });

})


//Send the server on port 3000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);