import React from 'react'
import './Add.css';
import { assets } from '../../assets/assets';
import { useState } from 'react'; 
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name:"",
    description : "",
    price : "",
    category : "Salad"
  }); 

  const [categories, setCategories] = useState([]);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/list`);
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };
  fetchCategories();
}, []);

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData( data=>({...data,[name]:value  }))
  }

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name );
    formData.append("description", data.description )
    formData.append("price", Number(data.price) )
    formData.append("category", data.category )
    formData.append("image", image )
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
            name:"",
            description : "",
            price : "",
            category : "Salad"
          })
          setImage(false);
          toast.success(response.data.message);
    }else{
          toast.error(response.data.message);
    }
  }
   

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className={`add-image-upload flex-col ${image ? "has-preview" : ""}`}>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>


          <div className='add-product-name flex-cole'>
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name"   placeholder='Type Here' />
          </div>

          <div className='add-product-description flex-cole'>
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} type="text" name="description" rows="6"
            placeholder='Write Content Here' required>  </textarea> 
          </div>

          <div className='add-category-price flex-cole'>
            <div className='add-category'>
              <p>Product Category</p>
              <select onChange={onChangeHandler} name="category" value={data.category}>
                {categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <option key={index} value={cat.name}>{cat.name}</option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>  
            <div className='add-price flex-col'>
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$100" />  
            </div>  
          </div>
          <button type='submit' className='add-btn' >ADD</button>
      </form>
       
    </div>
  )
}

export default Add
