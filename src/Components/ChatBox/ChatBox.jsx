import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import profile_img from "../../assets/profile_richard.png";
import green_dot from "../../assets/green_dot.png";
import help_icon from "../../assets/help_icon.png";
import gallery_icon from "../../assets/gallery_icon.png";
import send_button from "../../assets/send_button.png";
import logo_icon from "../../assets/logo_icon.png";
import pic1 from "../../assets/pic1.png";
import { AppContext } from "../../Context/AppContext";
import { arrayUnion, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../Config/firebase";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

  console.log("chatUser", chatUser);

  // State variable to store the data of the message input field
  const [input, setInput] = useState("");

  // Send message function
  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });

          const userIDs = [chatUser.rId, userData.id];

          userIDs.forEach(async (id) => {
            const userChatsRef = doc(db, "chats", id);
            const userChatsSnapShot = await getDoc(userChatsRef);

            if (userChatsSnapShot.exists()) {
              const userChatData = userChatsSnapShot.data();
              const chatIndex = userChatData.chatsData.findIndex(
                (c) => c.messageId === messagesId
              );
              userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
              userChatData.chatsData[chatIndex].updatedAt = Date.now();

              if (userChatData.chatsData[chatIndex].rId === userData.id) {
                userChatData.chatsData[chatIndex].messageSeen = false;
              }
              await updateDoc(userChatsRef, {
                chatsData: userChatData.chatsData,
              });
            }
          });
        setInput("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  timestamp to 12-hour format (AM/PM)
  const convertTimestamp = (timestamp) => {

    if (!timestamp) return "Invalid Time";  // Handle case when timestamp is undefined

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp); 
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // minutes to ensure it's always two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Check if it's AM or PM and adjust hours accordingly
    if (hours >= 12) {
      return (hours === 12 ? hours : hours - 12) + ':' + formattedMinutes + ' PM';
    } else {
      return (hours === 0 ? 12 : hours) + ':' + formattedMinutes + ' AM';
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser?.avatar || profile_img} alt="" />
        <p>
          {chatUser?.name || chatUser?.username || chatUser?.email || "unknown"}
          <img className="dot" src={green_dot} alt="" />
        </p>

        <img src={help_icon} alt="" />
      </div>

      <div className="chat-message">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={msg.sId === userData.id ? "sender-msg" : "recieve-msg"}
            >
              <p className="msg">{msg.text}</p>
              <div>
                <img
                  src={msg.sId === userData.id ? userData.avatar : chatUser.avatar}
                  alt=""
                />
                <p>{convertTimestamp(msg.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          type="text"
          placeholder="Send a message"
        />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={send_button} alt="" />
      </div>
    </div>
  ) : (
    <div className="chat-welcome">
      <img src={logo_icon} alt="" />
      <p>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatBox;
