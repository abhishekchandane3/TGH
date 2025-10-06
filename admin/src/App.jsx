 import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import Inventory from './pages/Inventory/Inventory.jsx'
import { ToastContainer } from 'react-toastify';
import Category from './pages/Categories/Category.jsx'
 const App = () => {

  const url = "http://localhost:4000";

   return (
     <div>
      <ToastContainer/>
       <Navbar />
       <hr />
       <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element={ <Add url={url}/>}  />
          <Route path="/list" element={ <List url={url}/>} />
          <Route path="/orders" element={ <Orders url={url}/>} /> 
          <Route path="/inventory" element={<Inventory url={url} />} />
          <Route path="/category" element={<Category url={url} />} /> {/* ✅ Fix */}
        </Routes>
       </div>
     </div>
   )
 }
 
 export default App
 