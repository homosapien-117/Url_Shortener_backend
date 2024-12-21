import { Schema, model } from "mongoose";

const urlSchema = new Schema(
  {
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const URLModel = model("URL", urlSchema);

export { URLModel };