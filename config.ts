import { initializeApp  } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig={
    //project objext
};

const app =initializeApp(firebaseConfig);
export const db=getDatabase(app);