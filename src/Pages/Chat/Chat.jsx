import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSidebarr from '../../Components/LeftSidebar/LeftSidebarr'
import ChatBox from '../../Components/ChatBox/ChatBox'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import { AppContext } from '../../Context/AppContext'

const Chat = () => {

  const {chatData, userData} = useContext(AppContext);
  const [loading, setLoading] = useState(true)


  useEffect(()=>{

    if (chatData && userData) {
      setLoading(false)
    }

  },[chatData,userData])

  return (
    <div className='chat'>
      {
        loading?<p className='loading'>Loading...</p>
        :<div className="chat-container">
        <LeftSidebarr/>
        <ChatBox/>
        <RightSidebar/>
      </div>
      }
      
    </div>
  )
}

export default Chat
