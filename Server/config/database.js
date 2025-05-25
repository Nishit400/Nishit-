import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection error:", error);
    console.log("Failed to connect to the database");
  }
};

export default connectDB;