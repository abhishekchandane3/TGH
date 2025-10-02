import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom' 

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className='sidebar-option'>
          <img src={assets.add_icon} alt="add" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className='sidebar-option'>
          <img src={assets.order_icon} alt="list" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className='sidebar-option'>
          <img src={assets.order_bell_icon} alt="orders" />
          <p>Orders</p>
        </NavLink>

        {/* ✅ New Inventory Link */}
        <NavLink to='/inventory' className='sidebar-option'>
          <img src={assets.inventory_icon} alt="inventory" />
          <p>Inventory</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
