import React from 'react';
import Navbar2 from './components/Navbar/Navbar2';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Footer from './components/Footer/Footer';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

import OurStory from './pages/OurStory/OurStory';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import Review from './pages/Review/Review';

const App = () => {
  return (
    <>
      <div className='app'>
        {/* 🔹 Navbar now directly handles navigate to login/register */}
        <Navbar2 />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path="/our-story" element={<OurStory />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/review" element={<Review />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
