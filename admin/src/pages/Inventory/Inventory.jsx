import React, { useState, useEffect } from "react";
import "./Inventory.css";
import axios from "axios";
import { toast } from "react-toastify";

const Inventory = ({ url }) => {
  const [inventory, setInventory] = useState([]);
  const [editQty, setEditQty] = useState({}); // ✅ Track edited quantities

  // Fetch inventory list
  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${url}/api/inventory`);
      if (res.data.success) {
        setInventory(res.data.data);

        // reset editQty state with fresh data
        const initialQty = {};
        res.data.data.forEach((item) => {
          initialQty[item._id] = item.availableQuantity;
        });
        setEditQty(initialQty);
      } else {
        toast.error("Failed to fetch inventory");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching inventory");
    }
  };

  // Update stock quantity
  const updateStock = async (id) => {
    const qty = editQty[id];

    if (qty > 1000) {
      toast.error("Quantity cannot be more than 1000");
      return;
    }

    try {
      const res = await axios.put(`${url}/api/inventory/${id}`, {
        availableQuantity: qty,
      });

      if (res.data.success) {
        toast.success("Stock updated");
        fetchInventory(); // refresh list
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating stock");
    }
  };

  // Delete stock entry
  const deleteStock = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/inventory/${id}`);
      if (res.data.success) {
        toast.success("Inventory deleted");
        fetchInventory();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting inventory");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Inventory Management</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Product</b>
          <b>Available Qty</b>
          <b>Threshold</b>
          <b>Actions</b>
        </div>

        {inventory.map((item) => (
          <div
            key={item._id}
            className={`list-table-format ${
              item.availableQuantity <= item.thresholdLimit ? "low-stock" : ""
            }`}
          >
            <p>{item.productId?.name}</p>

            <input
              type="number"
              value={editQty[item._id] || ""}
              min="0"
              max="1000"
              onChange={(e) =>
                setEditQty({ ...editQty, [item._id]: parseInt(e.target.value, 10) })
              }
            />

            <p>{item.thresholdLimit}</p>

            <div className="actions">
              <button className="btn-update" onClick={() => updateStock(item._id)}>Update</button>
              <button className="btn-delete" onClick={() => deleteStock(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
