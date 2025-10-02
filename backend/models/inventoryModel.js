// backend/models/inventoryModel.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food", // yeh aapke Product/Food model se link karega
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  thresholdLimit: {
    type: Number,
    default: 5 // low stock alert ke liye
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("inventoryModel", inventorySchema);
