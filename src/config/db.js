import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log(`Successfully Connected to MongoDB 👍`.bgBlack.magenta);
  } catch (error) {
    console.log(`Error in connecting database ${error}`.bgRed.white);
    res.status(500).json({
      success: false,
      message: "Error in connecting with MongoDB",
      error,
    });
  }
};

export default connectDB;
