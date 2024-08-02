import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userModel from "./models/user.js";

dotenv.config({path: "./config.env"});

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get("/", (req, res) => {
    let token = jwt.sign({email: "ali@gmail.com"}, "skldfjklsjf");
    res.cookie("token", token);
    res.render("index");
})

app.get("/read", async (req, res) => {
    const users = await userModel.find();
    res.render("read", {users});
    console.log(req.cookies.token);
})

app.post("/create", async (req, res) => {
    const {name, email, image} = req.body;
    await userModel.create({
        name,
        email,
        image
    });
    res.redirect("/read");
})

app.get("/update/:id", async (req, res) => {
    const foundUser = await userModel.findOne({_id: req.params.id});
    res.render("update", {foundUser});
})

app.post("/edit/:id", async (req, res) => {
    let {name, email, image} = req.body;
    await userModel.findOneAndUpdate({_id: req.params.id}, {name, email, image});
    res.redirect("/read");
})

app.get("/delete/:id", async (req, res) => {
    await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.listen(port, e => console.log("Your server is running on port: ", port));