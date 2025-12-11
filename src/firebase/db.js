// firebase/db.js
import { getFirestore, collection } from "firebase/firestore";
import { app } from "./config";

export const db = getFirestore(app);
export const messagesCollection = collection(db, "messages");
