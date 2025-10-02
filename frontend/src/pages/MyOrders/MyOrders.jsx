import React, { useState , useContext} from 'react'
import './MyOrders.css' 
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]); 

    const fetchOrders = async()=>{ 
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data); 
        console.log(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='myorders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.map((order, index)=>{
            return(
                <div key={index} className='my-orders-order'>
                    <img src={assets.order_2}  alt='order'/>
                    <p>{order.items.map((item, index) =>{
                        return <span key={index}>{item.name} ({item.quantity}) {index!==order.items.length-1 ? ", " : ""}</span>
                    } )}
                    </p>

                    <p> {order.amount}.00  </p>
                    <p> Items : {order.items.length} </p>

                    <p>
                      Status:{" "}
                      <span
                        className={`badge ${
                          order.status?.toLowerCase() === "food processing"
                            ? "status-processing"
                            : order.status?.toLowerCase() === "out for delivery"
                            ? "status-out"
                            : order.status?.toLowerCase() === "delivered"
                            ? "status-delivered"
                            : "status-cancelled"
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>


                     <p>
                      Payment:{" "}
                      <span
                        className={`badge ${
                          order.payment ? "payment-done" : "payment-pending"
                        }`}
                      >
                        {order.payment ? "Done" : "Pending"}
                      </span>
                    </p>

                    <button>Track Order</button>
               </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders
