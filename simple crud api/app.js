import express from "express"
import { config } from "dotenv";
import dbConnection from "./database/dbConnection.js";
import productRoutes from "./routes/product.route.js"

const app = express();

config({ path: "./config/config.env"})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/product", productRoutes)

dbConnection();

export default app;