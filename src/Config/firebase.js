import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify"; 

  const firebaseConfig = {
    apiKey: "AIzaSyBXqShVZi1Ky5A0Px1hDsp-rX1LNYCU-Fs",
    authDomain: "chat-app-2e791.firebaseapp.com",
    projectId: "chat-app-2e791",
    storageBucket: "chat-app-2e791.firebasestorage.app",
    messagingSenderId: "259567802675",
    appId: "1:259567802675:web:cd07cbd326c71354370646"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app)

  //creating new account

  const signup = async( username, email, password) =>{
    try{
      const res = await createUserWithEmailAndPassword(auth,email,password)
      const user = res.user;
    
  //Creating user data in usercollection

      await setDoc(doc(db,'users', user.uid),{
          id:user.uid,
          username:username.toLowerCase(),
          email,
          name:username,
          avatar:'',
          bio:'hey there iam using chat app',
          lastSeen:Date.now()
      })

      //one more data in new collection

      await setDoc(doc(db,'chats', user.uid),{
          chatsData:[],
      })
    }catch(error){
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  }

  //Login function

  const login = async(email, password)=>{
    try{
      await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }

  }

  // Logout //exported from forebase

  const logout = async()=>{
    try {
      await signOut(auth)
    }catch(error){
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(' '));
    
    }
  }

  export {signup,login,logout,auth,db}