import mongoose from "mongoose";
import { userSchema } from "../schema/authSchema.js";
const user = mongoose.model("user", userSchema);
export { user };
