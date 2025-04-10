import React from 'react'
import './ProfileUpdate.css'
import avatar_icon from '../../assets/avatar_icon.png'
import logo_icon from '../../assets/logo_icon.png'

const ProfileUpdate = () => {
  return (
    <div className='profile'>
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
          <input type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
          <img src={avatar_icon} alt="" />
          Upload profile image
          </label>
          <input type="text" placeholder='your name' required/>
          <textarea placeholder='Write profile bio' required></textarea>
          <button type ='submit'>Submit</button>
        </form>
        <img className='profile-pic' src={logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate
