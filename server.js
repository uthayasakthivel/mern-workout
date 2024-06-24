import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import giftRoutes from "./routes/giftRouter.js";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
dotenv.config();

// create and run server
app.listen(port, () => {
  console.log(`server running on port ${port} ....!`);
});

// connect DB
try {
  async function main() {
    await mongoose.connect(process.env.MONGO_URI);
  }
  main().then(() => {
    console.log("DB connected");
  });
} catch (error) {
  console.log("error");
  console.log(error);
}

//create schema

//create model

//create API'S
app.use("/gifts", giftRoutes);
