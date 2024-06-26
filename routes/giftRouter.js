import express from "express";
// import { gift } from "../models/giftModel.js";
import { gift } from "../models/giftModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allgifts = await gift.find();
    res.status(200).json(allgifts);
  } catch (error) {
    console.error("Error fetching gifts:", error);
    res.status(500).json({ error: "An error occurred while fetching gifts" });
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newgift = new gift({ title, description });
    await newgift.save();
    res.status(201).json(newgift);
  } catch (error) {
    console.error("Error creating gift:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the gift" });
  }
});

router.put("/:id", async (req, res) => {
  const currentgiftId = req.params.id;
  try {
    const newgift = await gift.findOneAndUpdate(
      {
        _id: currentgiftId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        new: true,
      }
    );
    if (!newgift) return res.status(404).json({ error: "gift not found" });
    res.status(201).json(newgift);
  } catch (error) {
    console.error("Error creating gift:", error);
    res
      .status(500)
      .json({ error: "An error occurred while Updating the gift" });
  }
});

router.delete("/:id", async (req, res) => {
  const currentgiftId = req.params.id;

  try {
    const deletedgift = await gift.deleteOne({
      _id: currentgiftId,
    });
    if (!deletedgift) return res.status(404).json({ error: "gift not found" });
    res.status(200).json({ message: "Deleted Successfully", deletedgift });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while Deleting the gift" });
  }
});

export default router;
