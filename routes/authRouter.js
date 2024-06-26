import express from "express";
import { user } from "../models/userModel.js";
import bcrypt from "bcrypt";
const router = express.Router();

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePassword(inputPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new user({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json(`Profile Created Successfully`);
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ error: "User already Exists" });
    res
      .status(400)
      .json({ error: "An error occurred while creating the user" });
    console.log("Error creating user:", error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUserExists = await user.findOne({ username });
    if (!checkUserExists)
      return res.status(404).json({ error: "User not found" });
    const isMatch = await comparePassword(password, checkUserExists.password);
    if (isMatch) {
      res.status(200).json(`Welcome ${username}`);
    } else {
      res.status(400).json("Incorrect Password");
    }
    // if (password !== checkUserExists.password)
    //   return res.status(400).json(`Incorrect Password`);
    // res.status(200).json(`Welcome ${username}`);
  } catch (error) {
    console.log(`Error while login ${error}`);
    res.status(400).json({ error: "An error occurred while login" });
  }
});

export default router;
