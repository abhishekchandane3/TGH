import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing User Order For Frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://tgh-frontend.onrender.com";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // clear user cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // paise
      },
      quantity: item.quantity,
    }));

    // Delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 20 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // save sessionId
    newOrder.sessionId = session.id;
    await newOrder.save();

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Receiving Payment Verification From Frontend
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try{
    if(success == "true"){
      await orderModel.findByIdAndUpdate(orderId, { payment:true  ,status: "Food Processing" });
      res.json({ success: true, message: "Paid" });
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// User Orders For Frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({userId: req.body.userId});
    res.json({success:true,data:orders});
  }catch(error){
    console.log(error);
    res.json({success:false, message:"error"});
  }
}


// Listing Orders For Admin Pannel 

const listOrders = async (req, res) => {
  try{
    const orders = await orderModel.find({});
    res.json({success:true, data:orders})
  }catch(error){
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}


// Api for admin to update order status
const updateStatus = async (req, res) => {
  try{
    const {orderId, status} = req.body;
    await orderModel.findByIdAndUpdate(orderId, {status: status});
    res.json({success:true, message:"Order Status Updated"})
  }catch(error){ 
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };