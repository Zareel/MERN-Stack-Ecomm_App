import express, { json } from "express";
import crypto from "crypto";
import colors from "colors";
import config from "./src/config/index.js";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import collectionRoutes from "./src/routes/collectionRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

//rest object
const app = express();

//config database
connectDB();

//middlewares
app.use(cors()); //allows to interact with client which is loaded in different domain
app.use(express.json()); // instructing the app to accept data in the json format
app.use(express.urlencoded({ extended: true })); //instructing the app to accept data in the url ecoded format as well
app.use(morgan("dev")); // logs requests, errors and more to the console
app.use(cookieParser()); // it allows the server to access users cookie

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/collection", collectionRoutes);
app.use("/api/v1/product", productRoutes);

//generate secret key
/*
let key = crypto.randomBytes(64).toString("hex");
console.log(key);
*/

//route
//URL => http://localhost:4000
app.get("/", (req, res) => {
  res.send("<h1>My Ecommerce App</h1>");
});

//app Listening

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`App is up and running on PORT: ${PORT}`.bgBlue.white);
});
