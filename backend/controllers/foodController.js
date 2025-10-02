import foodModel from "../models/foodModel.js";
import inventoryModel from "../models/inventoryModel.js";
import fs from "fs";

// Add Food Item + Create Inventory
const addFood = async (req, res) => {
  try {
    // Safely handle file upload
    let image_filename = req.file ? req.file.filename : null;

    if (!image_filename) {
      return res.json({ success: false, message: "Image is required" });
    }

    // 1️⃣ Save food
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });
    await food.save();

    // 2️⃣ Create initial inventory record
    const inventory = new inventoryModel({
      productId: food._id,
      availableQuantity: 0, // initial stock 0
      thresholdLimit: 5,    // default low stock threshold
    });
    await inventory.save();

    res.json({
      success: true,
      message: "Food added and inventory record created",
      data: { food, inventory },
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};


// All Food List
const listFood = async(req, res) =>{
    try{
        const foods = await foodModel.find({});
        res.json(
            {success:true, data:foods}
        )
    }catch(error){
        console.log(error);
        res.json(
            {success:false,  message : "Error"}
        )
    }
} 

  // Remove Food Item
  const removeFood = async (req, res) => {
    try {
      const food = await foodModel.findById(req.body.id);
      if (!food) {
        return res.json({ success: false, message: "Food not found" });
      }

      // 🗑️ Image delete
      fs.unlink(`uploads/${food.image}`, () => {});

      // 🗑️ Inventory record bhi delete
      await inventoryModel.deleteOne({ productId: food._id });

      // 🗑️ Food delete
      await foodModel.findByIdAndDelete(req.body.id);

      res.json({ success: true, message: "Food & Inventory Removed" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

export {addFood, listFood , removeFood}