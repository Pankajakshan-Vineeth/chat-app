import React from 'react'
import './ChatBox.css'
import profile_img from '../../assets/profile_richard.png'
import green_dot from '../../assets/green_dot.png'
import help_icon from '../../assets/help_icon.png'
import gallery_icon from '../../assets/gallery_icon.png'
import send_button from '../../assets/send_button.png'


const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src= {profile_img} alt="" />
        <p>Richard Sanford <img className = 'dot' src={green_dot} alt="" /></p>
        <img src={help_icon} alt="" />
      </div>

      <div className="chat-input">
        <input type="text"  placeholder='Send a message' />
        <input type="file"  id = 'image' accept='image/png, image/jpeg' />
        <label htmlFor="image">
          <img src={gallery_icon} alt="" />
        </label>
        <img src={send_button} alt="" />
      </div>
      
    </div>
  )
}

export default ChatBox
