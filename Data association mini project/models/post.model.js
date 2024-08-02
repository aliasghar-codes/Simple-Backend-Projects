import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: String,
    content: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
}, {timestamps: true});

export default mongoose.model("post", postSchema);