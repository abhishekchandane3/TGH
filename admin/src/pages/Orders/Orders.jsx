import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react' 
import axios from "axios";
import {assets} from "../../assets/assets"

import { FaUtensils, FaUserAlt, FaMapMarkerAlt, FaPhoneAlt, FaRupeeSign } from "react-icons/fa";


const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () =>{
    const response = await axios.get(url+"/api/order/list"); 
    if(response.data.success){
      setOrders(response.data.data); 
      console.log(response.data.data);
    }else{
      toast.error("Error")
    }
    return response.data
  }

  const statusHandler = async (event ,orderId) =>{
    console.log(event.target.value);
    const response = await axios.post(url+"/api/order/status", {orderId: orderId, status: event.target.value});
    if(response.data.success){
      fetchAllOrders();
    }else{
      toast.error("Error")
    }
  }

  useEffect( () =>{
      fetchAllOrders() 
  },[] )


return (
  <div className='order add'>
    <h3>Order Page</h3>
    <div className='order-list'>
      {orders.map((order, index)=>(
        <div key={index} className='order-item'>
          <img src={assets.parcel_icon} alt="" />



             {/* Food Items Section */}
            <div className="order-section">
              <h4 className="order-label">
                <FaUtensils className="order-icon" /> Food Items
              </h4>
              <p className="order-item-food">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>

            {/* Customer Section */}
            <div className="order-section">
              <h4 className="order-label">
                <FaUserAlt className="order-icon" /> Customer
              </h4>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="order-item-phone">
                <FaPhoneAlt className="inline-icon" /> {order.address.phone}
              </p>
            </div>

            {/* Address Section */}
            <div className="order-section">
              <h4 className="order-label">
                <FaMapMarkerAlt className="order-icon" /> Address
              </h4>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state} - {order.address.zipcode}
                </p>
              </div>
            </div>

            {/* Amount & Status */}
            <div className="order-section order-actions">
              <p className="order-amount">
                <FaRupeeSign className="inline-icon" /> {order.amount}
              </p>
              <select onChange={(event)=>statusHandler(event,order._id)} 
              value={order.status} className="order-status">
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

 
        </div>
      ))}
    </div>
  </div>
)

}

export default Orders
