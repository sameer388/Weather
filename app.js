const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//Request for the home route
app.get("/", function (req, res) {
    // Get the data from the index.html
    res.sendFile(__dirname + "/index.html");
});

//We use the data here what user has input
app.post("/",function(req,res){
    
    const queries = req.body.cityName;
    const appKey = "4c3506968ef04f5e5523545188e8a6c6";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+queries+"&appid="+appKey+"&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feels_like = weatherData.main.feels_like;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const Imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + ".</p>");
            res.write("<h1>The temperature in "+queries+" is " + temp + " degree Celsius.</h1>");
            res.write("<img src=" + Imgurl + ">");
            res.send();
        });
    });

})



//Send the server on port 3000
app.listen(3000, function () {
    console.log("Server is running on port 3000");
})