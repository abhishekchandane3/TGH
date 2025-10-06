import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  image: { type: String }, // optional, if you want category icons
});

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;