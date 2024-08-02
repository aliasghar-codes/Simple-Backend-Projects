import mongoose from "mongoose";

const connection = () => {
    mongoose.connect(process.env.DATABASEURI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));
}

export default connection;