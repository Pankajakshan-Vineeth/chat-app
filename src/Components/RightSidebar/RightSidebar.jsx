import React, { useContext } from 'react'
import './RightSidebar.css'
import profile_img from '../../assets/profile_richard.png'
import green_dot from '../../assets/green_dot.png'
import pic1 from '../../assets/pic1.png'
import pic2 from '../../assets/pic2.png'
import pic3 from '../../assets/pic3.png'
import pic4 from '../../assets/pic4.png'
import { logout } from '../../Config/firebase'
import { AppContext } from '../../Context/AppContext'


const RightSidebar = () => {

  const {chatUser, messages} = useContext(AppContext);

  return chatUser ? (

    <div className='rs'>

      <div className="rs-profile">
        <img src={profile_img} alt="" />
        <h3>{Date.now() - chatUser.lastSeen <= 70000 && <img className="dot" src={green_dot} alt="" />}
             {chatUser.name} </h3>

        <p>{chatUser.bio}</p>
      </div>
      <hr/>

      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={pic1} alt="" />
          <img src={pic2} alt="" />
          <img src={pic3} alt="" />
          <img src={pic4} alt="" />
          <img src={pic1} alt="" />
          <img src={pic2} alt="" />
        </div>
      </div>
     <button onClick ={()=>logout()}>Logout</button>
    </div>
  ) :  ( 
    <div className='rs'>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default RightSidebar
