import  React,{ useContext} from 'react'
import "./verify.css";   
import { useSearchParams } from 'react-router-dom';

import { StoreContext } from '../../context/StoreContext';

const verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    // console.log(success, orderId);
    const {url} = useContext(StoreContext)

    const verifyPayment = async()=>{
        try{
            const res = await fetch(`${url}/api/order/verify`, {   
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId, success })
            });
            const data = await res.json();
            // console.log(data);
            if(data.success){
                alert("Payment Successful");
                window.location.href = "/"; // redirect to home
            }
            else{
                alert("Payment Failed");
                window.location.href = "/cart"; // redirect to cart
            }
        }catch(error){      
            console.log(error);
            alert("Something went wrong");
            window.location.href = "/cart"; // redirect to cart
        }
    }

    React.useEffect(()=>{
        verifyPayment();
    },[])
    


  return (
    <div className='verify'>
      <div className='spinner'></div> 
    </div>
  )
}

export default verify
