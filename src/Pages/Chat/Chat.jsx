import React from 'react'
import './Chat.css'
import LeftSidebarr from '../../Components/LeftSidebar/LeftSidebarr'
import ChatBox from '../../Components/ChatBox/ChatBox'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSidebarr/>
        <ChatBox/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Chat
