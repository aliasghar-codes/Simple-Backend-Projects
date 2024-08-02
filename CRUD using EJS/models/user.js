import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/BackendKiPractice")
.then(e => console.log("Connected successfully to database"))
.catch(e => console.log(e))

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
})

export default mongoose.model("user", userSchema);