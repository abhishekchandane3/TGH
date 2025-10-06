import fs from "fs";
import categoryModel from "../models/categoryModel.js";

// ➕ Add Category
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const existing = await categoryModel.findOne({ name });
    if (existing) {
      if (image) fs.unlinkSync(`uploads/${image}`);
      return res.json({ success: false, message: "Category already exists" });
    }

    const newCategory = new categoryModel({ name, description, image });
    await newCategory.save();
    res.json({ success: true, message: "Category added", data: newCategory });
  } catch (error) {
    console.error("Add Category Error:", error);
    res.json({ success: false, message: "Error adding category" });
  }
};

// 📜 List Categories
const listCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("List Category Error:", error);
    res.json({ success: false, message: "Error fetching categories" });
  }
};

// ✏️ Update Category
const updateCategory = async (req, res) => {
  try {
    console.log("Update Request:", req.body, req.file);

    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const category = await categoryModel.findById(req.params.id);
    if (!category) return res.json({ success: false, message: "Category not found" });

    // Delete old image if new one uploaded
    if (image && category.image) {
      try {
        fs.unlinkSync(`uploads/${category.image}`);
      } catch (err) {
        console.log("Old image delete error:", err.message);
      }
    }

    category.name = name;
    category.description = description;
    if (image) category.image = image;

    await category.save();
    res.json({ success: true, message: "Category updated" });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.json({ success: false, message: "Error updating category" });
  }
};

// ❌ Delete Category
const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) return res.json({ success: false, message: "Category not found" });

    if (category.image) {
      try {
        fs.unlinkSync(`uploads/${category.image}`);
      } catch (err) {
        console.log("Image delete error:", err.message);
      }
    }

    await categoryModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Category removed" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.json({ success: false, message: "Error deleting category" });
  }
};

export { addCategory, listCategories, updateCategory, removeCategory };
