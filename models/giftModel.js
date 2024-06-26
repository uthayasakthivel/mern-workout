import mongoose from "mongoose";
import { giftSchema } from "../schema/giftSchema.js";
const gift = mongoose.model("gift", giftSchema);

export { gift };
