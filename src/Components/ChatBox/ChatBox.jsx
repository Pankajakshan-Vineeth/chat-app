import React, { useContext, useState } from "react";
import "./ChatBox.css";
import profile_img from "../../assets/profile_richard.png";
import green_dot from "../../assets/green_dot.png";
import help_icon from "../../assets/help_icon.png";
import gallery_icon from "../../assets/gallery_icon.png";
import send_button from "../../assets/send_button.png";
import logo_icon from '../../assets/logo_icon.png';
import pic1 from "../../assets/pic1.png";
import { AppContext } from "../../Context/AppContext";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

    //state variable to store the data of the message input field

    const [input, setInput] = useState('')

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser?.userData ?.avatar || profile_img} alt="" />
        <p>
          {chatUser?.userData?.name || chatUser?.userData?.username || 'unknown'} <img className="dot" src={green_dot} alt="" />
        </p>
        <img src={help_icon} alt="" />
      </div>

      <div className="chat-message">
        <div className="sender-msg">
          <p className="msg">
            Lorel ipsum is placeholder text commonly used in ..
          </p>
          <div>
            <img src={profile_img} alt="" />
            <p>2:30PM</p>
          </div>
        </div>

        <div className="sender-msg">
          <img className="msg-img" src={pic1} alt="" />
          <div>
            <img src={profile_img} alt="" />
            <p>2:30PM</p>
          </div>
        </div>

        <div className="recieve-msg">
          <p className="msg">
            Lorel ipsum is placeholder text commonly used in ..
          </p>
          <div>
            <img src={profile_img} alt="" />
            <p>2:30PM</p>
          </div>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Send a message" />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={gallery_icon} alt="" />
        </label>
        <img src={send_button} alt="" />
      </div>
    </div>
  )
  :<div className="chat-welcome">
    <img src= {logo_icon} alt="" />
    <p>Chat anytime, anywhere</p>
  </div>
};

export default ChatBox;
