import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import {getFirestore, setDoc} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA6GVU0m8Rz2Hr7iBwXOdB2DtZQ4D3Evg0",
  authDomain: "chat-app-11324.firebaseapp.com",
  projectId: "chat-app-11324",
  storageBucket: "chat-app-11324.firebasestorage.app",
  messagingSenderId: "84657768793",
  appId: "1:84657768793:web:aaddd3f5d6e2ee481e6448"
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
        name:'',
        avatar:'',
        bio:'hey there iam using chat app',
        lastSeen:Date.now()
    })

    //one more data in new collection

    await setDoc(doc(db,'chats', user.uid),{
        chatData:[],
    })
  }catch(error){
    console.error(error)
    toast.error(error.code)
  }
}

export {signup}