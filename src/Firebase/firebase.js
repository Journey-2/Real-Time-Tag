import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJhay9nSnbVc80HS_5cjvTXcIvpvp9R-Q",
  authDomain: "new1-3f65d.firebaseapp.com",
  projectId: "new1-3f65d",
  storageBucket: "new1-3f65d.appspot.com",
  messagingSenderId: "126394722746",
  appId: "1:126394722746:web:a86805538db9b8a930d583",
  measurementId: "G-FYR0VCSS5Y"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const auth = getAuth(app);

export { auth };


