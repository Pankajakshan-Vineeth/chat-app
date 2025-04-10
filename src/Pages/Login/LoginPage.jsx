import React, { useState } from 'react'
import './LoginPage.css'
import logo_big from '../../assets/logo_big.png'


const LoginPage = () => {

const [currState, setCurrState] = useState('Sign Up') 

  return (
    <div className='login'>
        <img src={logo_big} alt="" className='logo'/>

        <form className="login-form">
          <h2>{currState}</h2>
          {currState === 'Sign Up'? <input type="text" placeholder ='username' className="form-input" />:null }
          <input type="emailaddress" placeholder ='emailaddress' className="form-input" />
          <input type="password" placeholder ='Password' className="form-input" />
          {currState === 'Sign Up' ? <button type = 'submit'>Create Account</button> : <button>Login</button> }

          <div className="login-term">
            <input type="checkbox" />
            <p>Agree to the terms of use and privacy policy</p>
          </div> 

          <div className="login-forgot">

            {currState === 'Sign Up' 
            
            ? <p className="login-toggle">Already have an account <span onClick={()=>setCurrState('Login')}>Login here</span></p>
            : <p className="login-toggle">Create an account <span onClick={()=>setCurrState('Sign Up')}>click here</span></p>
          
          }


          </div>
          
        </form>
    </div>
  )
}

export default LoginPage
