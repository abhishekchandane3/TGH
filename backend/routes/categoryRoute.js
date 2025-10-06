import express from "express";
import multer from "multer";
import {
  addCategory,
  listCategories,
  removeCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// 🖼 Configure multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.get("/list", listCategories);
categoryRouter.put("/update/:id", upload.single("image"), updateCategory);
categoryRouter.delete("/remove/:id", removeCategory);

export default categoryRouter;
