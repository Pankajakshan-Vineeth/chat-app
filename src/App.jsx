import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/Login/LoginPage'
import Chat from './Pages/Chat/Chat'  
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/Chat' element={<Chat />} />  
      <Route path='/Profile' element={<ProfileUpdate />} />
    </Routes>
  )
}

export default App
