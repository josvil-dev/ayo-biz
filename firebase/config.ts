import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDIQnlOKMGm7BweztvUa6fv9gN2bxN82Q0",
    authDomain: "ayoba-business-hub.firebaseapp.com",
    projectId: "ayoba-business-hub",
    storageBucket: "ayoba-business-hub.appspot.com",
    messagingSenderId: "180812932890",
    appId: "1:180812932890:web:0bd58d0baf2868b2162ea3",
    measurementId: "G-Z3V9QEREX1"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);