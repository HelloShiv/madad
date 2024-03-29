import mongoose, { Schema } from "mongoose";
import shortid from "shortid";

const tempcodeshareSchema = new Schema({
  shortId: {
    type: String,
    unique: true,
    default: shortid.generate, // Generate a unique short ID
  },
  language: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10s", // Documents will expire after 1/2 hour (1800 seconds)
  },
});

export const TempCodeShare = mongoose.model(
  "TempCodeShare",
  tempcodeshareSchema
);
