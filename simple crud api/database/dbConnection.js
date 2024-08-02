import mongoose from "mongoose"

const dbConnection = () => {

    mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log("database connected successfully") )
    .catch( error => console.error("Error occured while connecting to database: ", error))

}

export default dbConnection;