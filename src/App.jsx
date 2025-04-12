import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/Login/LoginPage'
import Chat from './Pages/Chat/Chat'  
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

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
