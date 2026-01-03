import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {doc, setDoc} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { updateDoc } from "firebase/firestore";

// Create context
const AuthContext = createContext();

// Auth Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observe auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  // Signup function
  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, email, password);

      // Get user details
      const user = userCredential.user;

      // Save user info in Firestore in users collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        phone: "",
        address:"",
        photoUrl: "",
        createdAt: new Date(),
      });

      return userCredential;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try{
      return await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
      console.log("Login Error:", error);
      throw error;
    }
  };

  const resetPassword= (email)=>sendPasswordResetEmail(auth, email);



  //Update Logic
  const updateUserProfile=async(uid, data) =>{
    const useRef= doc(db, "users", uid);
    await updateDoc(updateUserProfile, data);
  };

  // Logout function
  const logout = async() => {
    return signOut(auth);
  };

  // Expose values globally
  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUserProfile, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook to use Auth context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
