const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

app.listen(5000, () => console.log("server started at port 5000"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/bmicalculator", (req, res)=>{
    let weight = Number.parseInt(req.body.weight);
    let height = Number.parseInt(req.body.height);
    let bmi = weight / (height * height);
    res.send(`<h1>Your BMI is ${bmi}</h1>`);
})