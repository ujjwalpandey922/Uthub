import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvXZpd1qRVW0gKNoXLpS5IJbpB4-M1EX4",
  authDomain: "uthub-ccddc.firebaseapp.com",
  projectId: "uthub-ccddc",
  storageBucket: "uthub-ccddc.appspot.com",
  messagingSenderId: "440024814318",
  appId: "1:440024814318:web:12decb873e7d757661d9ff",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
