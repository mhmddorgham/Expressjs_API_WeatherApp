const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {

  const city = req.body.cityName;
  const api = "d2eca4a62bb0b00016f438ec843eee29";
  const units = req.body.unitdegree;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=" + units
  https.get(url, (resp) => {
    console.log(resp.statusCode);


    resp.on("data", (chunk) => {
      const WeatherData = JSON.parse(chunk)
      console.log(WeatherData);
      const dubaiTemp = WeatherData.main.temp;
      const dubaiWeatherDes = WeatherData.weather[0].description;
      const imgID = WeatherData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${imgID}@2x.png`;
      console.log(dubaiTemp);
      console.log(dubaiWeatherDes);

      if (units === "metric") {
        res.write("<h1>Temperature  in Dubai is " + dubaiTemp + " degree celsius </h1>");
      }
      else if (units === "") {
        res.write("<h1>Temperature  in Dubai is " + dubaiTemp + " degree Kelvins </h1>");
      }

      else if (units === "imperial") {
        res.write("<h1>Temperature  in Dubai is " + dubaiTemp + " degree Fahrenheit </h1>");
      }
      res.write("<h2>The Weather is currently " + dubaiWeatherDes + "! </h2>");


      res.write("<img src=" + imgURL + " +/>");
      res.send();
    })
  });
})



app.listen(3000, () => {
  console.log("Server running on port 3000");
})