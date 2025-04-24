import React from 'react'
import './LeftSidebar.css'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu_icon.png'
import search_icon from '../../assets/search_icon.png'
import profile_img from '../../assets/profile_richard.png'
import { useNavigate } from 'react-router-dom'

const LeftSidebarr = () => {

  const navigate = useNavigate();
  return (
    <div>
       <div className='ls'>

<div className="ls-top">
  <div className="ls-nav">
      <img src={logo} className='logo' alt="" />
      <div className="menu">
          <img src={menu_icon} alt="" />
          <div className="sub-menu">
            <p onClick={()=>navigate('/Profile')}>Edit profile</p>
            <hr/>
            <p>Logout</p>
          </div>
      </div>
  </div>

  <div className="ls-search">
      <img src={search_icon} alt="" />
      <input type="text" placeholder="search here" />
  </div>

</div>

<div className="ls-list">
  {Array(12).fill('').map((item, index) => (

    <div key={index} className="friends">
      <img src={profile_img} alt="" />
      <div className='friends-para'>
      <p>Richard Sanford</p>
      <span>Hello, How are you?</span>
      </div>
    </div>
    
  ))}
</div>
</div>
    </div>
  )
}

export default LeftSidebarr
