import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjcYVDheFrolDkTimu9vsXAeAqd5i1jmE",
  authDomain: "ethosvta.firebaseapp.com",
  projectId: "ethosvta",
  storageBucket: "ethosvta.appspot.com",
  messagingSenderId: "593763369055",
  appId: "1:593763369055:web:9f332bbc8b7f275d7f5bea"
};

  const app = initializeApp(firebaseConfig);

  export const auth=getAuth(app);
  export const googleAuthProvider=new GoogleAuthProvider();