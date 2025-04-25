import React, { useContext, useState, useEffect } from "react";
import "./LeftSidebar.css";
import logo from "../../assets/logo.png";
import menu_icon from "../../assets/menu_icon.png";
import search_icon from "../../assets/search_icon.png";
import profile_img from "../../assets/profile_richard.png";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppContext } from "../../Context/AppContext";
import { db } from "../../Config/firebase";

const LeftSidebarr = () => {
  const navigate = useNavigate();
  const { userData, chatsData } = useContext(AppContext);
  const [userProfiles, setUserProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all user profiles when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(db, "users");
        const querySnapshot = await getDocs(userRef);
        const users = querySnapshot.docs.map((doc) => doc.data());

        // Remove the current user from the list (if userData is available)
        const filteredUsers = users.filter(user => user.id !== userData.id && user.name !== "Enrique Murphy");
        setUserProfiles(filteredUsers);
        setFilteredProfiles(filteredUsers); // Initially, show all profiles except the current user and Enrique Murphy
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (userData) {
      fetchUsers();
    }
  }, [userData]); // Run this effect whenever userData changes

  // Handle search input change
  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input) {
      const filtered = userProfiles.filter((user) =>
        user.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredProfiles(filtered);
    } else {
      setFilteredProfiles(userProfiles); // Reset to show all users when search is empty
    }
  };

  // Function to start a chat
  const addChat = async (user, userData) => {
    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");

    try {
      // 1. Create a new empty message doc
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const chatData = {
        messageId: newMessageRef.id,
        lastMessage: "",
        updatedAt: Date.now(),
      };

      // 2. Add to current user's chat
      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          ...chatData,
          rId: user.id,
          rName: user.name,
          rAvatar: user.avatar,
          messageSeen: true,
        }),
      });

      // 3. Add to the searched user's chat
      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          ...chatData,
          rId: userData.id,
          rName: userData.name,
          rAvatar: userData.avatar,
          messageSeen: false,
        }),
      });

      console.log("Chat successfully added.");
    } catch (error) {
      console.error("Error adding chat:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const setChat = async(user) => {
    console.log(user)
  }

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={logo} className="logo" alt="logo" />
          <div className="menu">
            <img src={menu_icon} alt="menu" />
            <div className="sub-menu">
              <p onClick={() => navigate("/Profile")}>Edit profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>

        <div className="ls-search">
          <img src={search_icon} alt="search" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search here"
          />
        </div>
      </div>

      <div className="ls-list">
        {filteredProfiles.map((user, index) => {
          const userExist = chatsData?.some((chat) => chat.rId === user.id);
          return (
            <div
              onClick = {()=>setChat(user)}
              key={index}
              className="friends"            >
              <img src={user.avatar || profile_img} alt="user" />
              <div className="friends-para">
                <p>{user.name || "Unknown"}</p>
                <span>{user.lastMessage || ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebarr;
