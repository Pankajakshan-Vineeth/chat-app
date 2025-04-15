import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './Pages/Login/LoginPage'
import Chat from './Pages/Chat/Chat'  
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Config/firebase'


const App = () => {

  const navigate = useNavigate();

  useEffect(()=>{
  onAuthStateChanged(auth,async(user)=>{
   if(user){

   }else{
    navigate('/')
   }
  })
  },[]) 

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/Chat' element={<Chat />} />  
      <Route path='/Profile' element={<ProfileUpdate />} />
    </Routes>
    </>
  )
}

export default App
