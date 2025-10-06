import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Category.css';
import { assets } from '../../assets/assets'; // ✅ to use upload_area icon

const Category = ({ url }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🟢 Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${url}/api/category/list`);
      if (res.data.success) setCategories(res.data.data);
      else toast.error("Failed to fetch categories");
    } catch (error) {
      toast.error("Server Error while fetching");
    }
  };

  // 🟢 Add or Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      let res;
      if (editId) {
        res = await axios.put(`${url}/api/category/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post(`${url}/api/category/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (res.data.success) {
        toast.success(editId ? "Category Updated" : "Category Added");
        setEditId(null);
        setName("");
        setDescription("");
        setImage(null);
        setPreview(null);
        fetchCategories();
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error("Server Error during submit");
    }
  };

  // 🔴 Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await axios.delete(`${url}/api/category/remove/${id}`);
      if (res.data.success) {
        toast.success("Category Deleted");
        fetchCategories();
      } else toast.error("Failed to delete");
    } catch (error) {
      toast.error("Server Error while deleting");
    }
  };

  // ✏️ Edit category
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description || "");
    setPreview(cat.image ? `${url}/uploads/${cat.image}` : null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      <h2>{editId ? "Edit Category" : "Add Category"}</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex-col"> 
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

                {/* ✅ Styled image upload same as Add.jsx */}
        <div className={`add-image-upload-category flex-col ${preview ? "has-preview" : ""}`}>
          <p>Upload Category Image</p>
          <label htmlFor="catImage">
            <img src={preview ? preview : assets.upload_area} alt="Upload" />
          </label>
          <input
            type="file"
            id="catImage"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditId(null);
              setName("");
              setDescription("");
              setImage(null);
              setPreview(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ✅ Category List */}
      <div className="category-list">
        <h3>Existing Categories</h3>
        {categories.map((cat) => (
          <div key={cat._id} className="category-item">
            <div className="category-info">
              {cat.image && (
                <img
                  src={`${url}/uploads/${cat.image}`}
                  alt={cat.name}
                  className="category-thumb"
                />
              )}
              <div>
                <p className="category-name">{cat.name}</p>
                <small>{cat.description || "No description"}</small>
              </div>
            </div>
            <div className="category-actions">
              <button className="edit-btn" onClick={() => handleEdit(cat)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(cat._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
