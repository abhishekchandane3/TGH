import React, {useEffect, useState} from 'react'

import './LoginPopup.css'
import {assets} from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Login");

    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value
        setData( data=>( {...data,[name]:value } ) )
    }

    useEffect( ()=>{ console.log(data); }, [data] )

  return (
    <div className='login-popup'> 
        <form  className="login-popup-container">
            <div className="login-popup-title">
                <h2 > {currState} </h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {currState==="Login"? <></> : <input name='name' onChange={onChangeHandler}  value={data.name} type="text" placeholder='Your Name' required /> }
                <input name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Your Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='  Password' required />
            </div>

            <button  > {currState==="Sign Up"?"Create Account":"Login"} </button>

            <div className='login-popup-condition'>
                <input type="checkbox" required />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            {currState==="Login"
                ? <p className='login-popup-forgot'>
                    Create a New Account ? 
                    <span onClick={()=>setCurrState("Sign Up")}> Click Here</span>
                   </p>
                   
                : <p className='login-popup-forgot'>
                    Already have an Account ? 
                    <span onClick={()=>setCurrState("Login")} > Login Here</span>
                  </p> 
                }
    
        </form>


    </div>
  )
}

export default LoginPopup
