import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function testFirebaseConnection() {
  try {
    await getDocs(collection(db, "connection_test"));
    console.log("Firebase connection successful!");
    return true;
  } catch (error) {
    console.error("Firebase connection failed:", error);
    return false;
  }
}