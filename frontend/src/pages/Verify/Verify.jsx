import  React,{ useContext} from 'react'

import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom';

import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    console.log(success, orderId);
    const {url} = useContext(StoreContext)

    const navigate = useNavigate();

    const verifyPayment = async()=>{
         try{
                const response = await axios.post(url+"/api/order/verify",{success, orderId});
                if(response.data.success){
                    navigate("/myorders");
                }else{
                    navigate("/");
                }
         }catch(error){
            console.log("Error in verifying payment", error);
            navigate("/");
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
