import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfFcixv5IjsOxnk-D2nWdzKppGSCOmseo",
  authDomain: "ideacion360.firebaseapp.com",
  projectId: "ideacion360",
  storageBucket: "ideacion360.firebasestorage.app",
  messagingSenderId: "879826613588",
  appId: "1:879826613588:web:ad94b7665d85f4dff044c1",
  measurementId: "G-TPG9LNB6QS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    return { user: result.user, idToken };
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logoutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
};
