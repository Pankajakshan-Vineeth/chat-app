import React, { useEffect, useState } from 'react'
import './ProfileUpdate.css'
import avatar_icon from '../../assets/avatar_icon.png'
import logo_icon from '../../assets/logo_icon.png'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../Config/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const ProfileUpdate = () => {

  const navigate = useNavigate();

  const [image, setImage] = useState(false)
  const [name,setName] = useState('');
  const [bio,setbio] = useState('');
  const [uid,setUid] = useState('');
  const [prevImage, setPrevImage] = useState('');
   
  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {

      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef); 

          const data = docSnap.data();
          if (data.name) {
            setName(data.name);
          }
          if (data.bio) {
            setBio(data.bio);
          }
          if (data.avatar) {
            setPrevImage(data.avatar);
          }
        } else {
          navigate('/');
        }
        
    });
  
  }, []);
  
 

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
          <input onChange = {(e)=>setName(e.target.value)} value = {name}type="text" placeholder='your name' required/>
          <textarea onChange = {(e)=>setbio(e.target.value)} value = {bio}placeholder='Write profile bio' required></textarea>
          <button type ='submit'>Submit</button>
        </form>
        <img className='profile-pic' src={image ? URL.createObjectURL(image):logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate
