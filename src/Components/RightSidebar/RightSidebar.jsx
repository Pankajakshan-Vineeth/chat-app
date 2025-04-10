import React from 'react'
import './RightSidebar.css'
import profile_img from '../../assets/profile_richard.png'
import green_dot from '../../assets/green_dot.png'
import pic1 from '../../assets/pic1.png'
import pic2 from '../../assets/pic2.png'
import pic3 from '../../assets/pic3.png'
import pic4 from '../../assets/pic4.png'



const RightSidebar = () => {

  return (

    <div className='rs'>

      <div className="rs-profile">
        <img src={profile_img} alt="" />
        <h3>Richard Sanford <img className = 'dot' src={green_dot} alt="" /></h3>
        <p>Hey, There i am Richard Sanford using chat app</p>
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
     <button>Logout</button>
    </div>
  )
}

export default RightSidebar
