import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser"

dotenv.config();

//import database

connectDB()
const app = express();
app.use(express.json())

// Use cors middleware
app.use(cors());
app.use(cookieParser());

//import routes
import testroute from "./routes/testroute.js"
//routes
app.use(testroute);
app.use(userRoute);
//

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Server</h1>");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Backend Working on ${PORT}`); // Corrected to use PORT variable
});