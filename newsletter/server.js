const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
// const mailchimpApiKey = "54d751ae4141ec8f9abf62703b9e561f-us21";
// const id = "daa032d828";

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => console.log("Your server is running at port 3000"));

app.use(express.static("public"));

app.get("/signup", (req, res)=>{
    res.sendFile(__dirname + "/public/signup.html")
})

app.post("/signup", (req, res)=>{
    const firstName = req.body.fname,
    secondName = req.body.lname,
    email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName 
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/daa032d828";

    const options = {
        method: "POST",
        auth: "ali:54d751ae4141ec8f9abf62703b9e561f-us21"
    }

    const request = https.request(url, options, (response)=>{
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/public/success.html")
        } else{
            res.sendFile(__dirname + "/public/failure.html");
        }
    })

    req.write(jsonData);
    req.end();

    // res.send("done! ") 
})

app.get("/", (req, res)=>{
    res.send("Hello bro")
})