import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
})

export default mongoose.model("user", userSchema);