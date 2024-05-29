import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPsQhoCgjOHpcpmIPHUeN23QfW8acksgM",
  authDomain: "driverapp-2024.firebaseapp.com",
  projectId: "driverapp-2024",
  storageBucket: "driverapp-2024.appspot.com",
  messagingSenderId: "961645884650",
  appId: "1:961645884650:web:65f552b2f38f7d35681393",
  measurementId: "G-YWKNYDZQP9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

