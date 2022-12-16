import { Schema } from "mongoose";

export const userSchema = new Schema({
  _id: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});
