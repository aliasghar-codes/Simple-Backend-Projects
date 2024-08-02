import express from "express";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let newItems = [];

app.get("/", (req, res) => {

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }

    const day = new Date().toLocaleDateString("en-US", options);

    res.render("index", {kindOfDay: day, newItems: newItems})
})

app.post("/", (req, res) => {
    let note = req.body.newItem;
    newItems.push(note);
    res.redirect("/");
    for(let i = 0; i < newItems.length; i++){
        console.log(newItems[i]);
    }
})






app.listen(3000, () => console.log("Your server is up and running at port 3000"));