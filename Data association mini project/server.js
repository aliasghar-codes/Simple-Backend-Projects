import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";
import databaseConnection from "./database/dbConnection.js";
import userModel from "./models/user.model.js";
import postModel from "./models/post.model.js";

const app = express();
const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);
dotenv.config({ path: "./config/config.env" }); 


app.use(express.json());
app.use(express.static(_dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index");
    console.log(req.cookies.token);
});

app.get("/profile", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('posts');
    res.render("profile", {user: user});
});

app.get("/post/:postid", isLoggedIn, async (req, res) => {
    const post = await postModel.findOne({ _id: req.params.postid });
    res.render("post", {post});
});

app.get("/editpost/:postid", isLoggedIn, async (req, res) => {
    const post = await postModel.findOne({ _id: req.params.postid });
    res.render("edit", {post});
});

app.get("/likepost/:postid", isLoggedIn, async (req, res) => {

    const post = await postModel.findOne({ _id: req.params.postid }).populate("user");
    
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    
    await post.save();

    res.redirect("/profile");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

app.post("/post", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email});
    const {post_title, post_content} = req.body;

    const post = await postModel.create({
        user: user._id,
        content: post_content,
        title: post_title
    })

    user.posts.push(post._id);
    await user.save();

    res.redirect("/profile");
})

app.post("/editpost/:postid", isLoggedIn, async (req, res) => {

    const {post_title, post_content} = req.body;

    await postModel.findOneAndUpdate({_id: req.params.postid}, {
        $set: {
            title: post_title,
            content: post_content
        }
    });

    res.redirect("/profile");
})

app.post("/signup_user", async (req, res) => {
    const {name, email, username, password, age} = req.body;
    
    const user = await userModel.findOne({email});
    if(user){
        res.status(404).send("User already registered with this email")
    };

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (error, hash) => {
            const user = await userModel.create({
                name,
                email,
                username,
                password: hash,
                age
            })
            const token = jwt.sign({email: email, userid: user._id}, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.redirect("/");
        })
    })
});

app.post("/login_user", async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        res.status(404).send("No user found with this email id");
    }

    bcrypt.compare(password, user.password, (error, result) => {
        if(result){
            const token = jwt.sign({email: email, userid: user._id}, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.redirect("/profile");
        }else{
            res.status(400).redirect("/login");
        }
    })

})

function isLoggedIn(req, res, next){
    if(!req.cookies.token){
        res.status(400).redirect("/login");
    }else{
        let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        req.user = data;
        next();
    }
}

databaseConnection();

app.listen(process.env.PORT, e => console.log(`Your server is running on port ${process.env.PORT}`));