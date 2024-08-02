const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");

app.listen(3000, () => console.log("Your server is running at port 3000"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res)=>{
    const query = req.body.cityName
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=3ed221345b9099091de884e9e6caf980`;
    https.get(url, response => {
            response.on("data", (data)=>{
                const weatherData = JSON.parse(data);
                const temp = Math.floor(weatherData.main.temp - 273.15);
                let weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
                res.write(`<p>Current weather is ${weatherDescription}</p>`)
                res.write(`<h1>Current temperature in ${query} is ${temp} degree celcius</h1>`)
                res.write(`<img src="${iconUrl}"></img>`)
            })
        })
})
