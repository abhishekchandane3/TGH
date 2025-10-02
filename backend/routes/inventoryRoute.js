import express from "express";
import { getAllInventory, addInventory, updateInventory, getLowStock, deleteInventory } from "../controllers/inventoryController.js";

const inventoryRouter = express.Router();

inventoryRouter.get("/", getAllInventory);         // GET all inventory
inventoryRouter.post("/add", addInventory);        // POST new inventory
inventoryRouter.put("/:id", updateInventory);      // PUT update stock
inventoryRouter.get("/low-stock", getLowStock);    // GET low stock
inventoryRouter.delete("/:id", deleteInventory);  // DELETE inventory item

export default inventoryRouter;
