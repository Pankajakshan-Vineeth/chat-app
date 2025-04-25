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
import { arrayUnion, updateDoc } from "firebase/firestore";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

  console.log("chatUser", chatUser);
  console.log("chatUser.userData", chatUser?.userData);

  //state variable to store the data of the message input field

  const [input, setInput] = useState("");

  //send message function

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
          const userChatsref = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsref);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findindex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsref, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
        console.log(res.data().messages.reverse());
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
        <img onClick = {sendMessage} src={send_button} alt="" />
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
