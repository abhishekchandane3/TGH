import inventoryModel from "../models/inventoryModel.js";

// 📌 Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.find().populate("productId");
    res.json({ success: true, data: inventory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Add new inventory item
const addInventory = async (req, res) => {
  try {
    const { productId, availableQuantity, thresholdLimit } = req.body;
    const newItem = new inventoryModel({ productId, availableQuantity, thresholdLimit });
    await newItem.save();
    res.json({ success: true, message: "Inventory item added", data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Update stock
const updateInventory = async (req, res) => {
  try {
    const updated = await inventoryModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, message: "Inventory updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Get low stock items
const getLowStock = async (req, res) => {
  try {
    const lowStock = await inventoryModel.find({
      $expr: { $lte: ["$availableQuantity", "$thresholdLimit"] }
    }).populate("productId");

    res.json({ success: true, data: lowStock });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteInventory = async (req, res) => {
  try {
    await inventoryModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Inventory deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




export { getAllInventory, addInventory, updateInventory, getLowStock, deleteInventory };
