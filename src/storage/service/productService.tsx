import { db } from "../../firebaseSetup/config";
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, updateDoc, query, where } from "firebase/firestore";
import { Items } from "../../types";

export async function addItem(items: Items): Promise<Items> {
  try {
    const itemsRef = doc(db, "items", items.id.toString());
    await setDoc(itemsRef, items);
    console.log("Ny product skapad med ID:", items.id);
    return items; 
  } catch (error) {
    console.error("Fel vid tillägg av product:", error);
    throw error; 
  }
}
