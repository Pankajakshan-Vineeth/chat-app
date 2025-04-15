import { createContext, useState } from "react";
import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const navigate = useNavigate();
    const [userData,setUserData] = useState(null);
    const [chatData,setChatData] = useState(null);

    const loadUserData = async (uid) =>{
        try{
         const userRef = doc(db,'users',uid)
         const userSnap = await getDoc(userRef)
         const userData = userSnap.data();
         setUserData(userData);    //storing in the state variable 

        //navigate to profile page if no avatar and name


        if (userData.avatar && userData.name) {
            navigate('/Chat'); // navigating to chat page
        } else {
            navigate('/Profile');
        }
        
        // Assuming userRef is a valid DocumentReference from Firestore
        await updateDoc(userRef, {
            lastSeen: Date.now()
        });
        

                      //set interval every one min
         ssetInterval(async () => {
            if (auth.chatUser) {
                await updateDoc(userRef, {
                    lastSeen: Date.now()
                });
            }
        }, 60000);
        
        }catch(error){

        }
    }

    const value = {
        userData,setUserData,
        chatData,setChatData,
        loadUserData
    }

    return(

        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider