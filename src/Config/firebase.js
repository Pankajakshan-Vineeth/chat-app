import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, setDoc, doc, Timestamp, collection, getDocs, query, where } from "firebase/firestore"; // Correct import for query and where
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
const auth = getAuth(app);
const db = getFirestore(app);

// Creating new account

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Creating user data in usercollection

    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: username,
      avatar: '',
      bio: 'hey there i am using chat app',
      lastSeen: Date.now()
    });

    // One more data in a new collection

    await setDoc(doc(db, 'chats', user.uid), {
      chatsData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

// Login function

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

// Logout function

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

// Reset Password function

const resetPass = async (email) => {
  if (!email) {
    toast.error('Please enter your email');
    return;
  }

  // Validating email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('email', '==', email));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {

      // If the email exists in the database
      await sendPasswordResetEmail(auth, email);
      toast.success('A password reset email has been sent');
    } else {
      // If the email does not exist in the database
      toast.error('The email does not exists');
    }
  } catch (error) {
    // error handling
    console.error('Error resetting password:', error.message);
    toast.error(error.message);
  }
};

export { signup, login, logout, auth, db, resetPass };
