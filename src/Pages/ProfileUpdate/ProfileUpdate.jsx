import React, { useState } from 'react'
import './ProfileUpdate.css'
import avatar_icon from '../../assets/avatar_icon.png'
import logo_icon from '../../assets/logo_icon.png'


const ProfileUpdate = () => {

  const [image, setImage] = useState(false)

  return (
    <div className='profile'> 
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden /> 
          <img src={image ? URL.createObjectURL(image):avatar_icon} alt="" />
          Upload profile image
          </label>
          <input type="text" placeholder='your name' required/>
          <textarea placeholder='Write profile bio' required></textarea>
          <button type ='submit'>Submit</button>
        </form>
        <img className='profile-pic' src={image ? URL.createObjectURL(image):logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate
