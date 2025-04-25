import React, { useContext, useState } from "react";
import "./LeftSidebar.css";
import logo from "../../assets/logo.png";
import menu_icon from "../../assets/menu_icon.png";
import search_icon from "../../assets/search_icon.png";
import profile_img from "../../assets/profile_richard.png";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, getDocs, where, query, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { AppContext } from "../../Context/AppContext";
import { auth, db } from "../../Config/firebase";

const LeftSidebarr = () => {
  const navigate = useNavigate();
  const userData = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0]) {
          setUser(querySnap.docs[0].data());
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {}
  };

//chat storage and click on user function

const addChat = async()=>{
  const messagesRef = collection(db,'messages');
  const chatsRef = collection(db,'chats');
  try {
    const newMessageRef = doc(messagesRef);
    await setDoc(newMessageRef,{
      createAt:serverTimestamp(),
      messages:[]
    )}

    await updateDoc(doc(chatsRef,user.id),{
      chatsData:arrayUnion({
        messageId:newMessageRef.id,
        lastMessage:'';
        rId:userData.Id,
        updatedAt:Date.now(),
        MessageSeen:true
      })

    })
  } catch (error) {
    
  }

}

  return (
    <div>
      <div className="ls">
        <div className="ls-top">
          <div className="ls-nav">
            <img src={logo} className="logo" alt="" />
            <div className="menu">
              <img src={menu_icon} alt="" />
              <div className="sub-menu">
                <p onClick={() => navigate("/Profile")}>Edit profile</p>
                <hr />
                <p>Logout</p>
              </div>
            </div>
          </div>

          <div className="ls-search">
            <img src={search_icon} alt="" />
            <input
              onChange={inputHandler}
              type="text"
              placeholder="search here"
            />
          </div>
        </div>

        <div className="ls-list">
          {showSearch && user ? (
            <div onClick = {addChat} className="friends add-user">
              <img src={user.avatar} alt="" />
              <p>{user.name}</p>
            </div>
          ) : (
            Array(12)
              .fill("")
              .map((item, index) => (
                <div key={index} className="friends">
                  <img src={profile_img} alt="" />
                  <div className="friends-para">
                    <p>Richard Sanford</p>
                    <span>Hello, How are you?</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarr;
