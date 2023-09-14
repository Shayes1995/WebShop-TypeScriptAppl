import { db } from "../../firebaseSetup/config";
import { doc, setDoc } from "firebase/firestore";


export async function addOrder(order: Order): Promise<Order> {
  try {
    const orderRef = doc(db, "orders", order.id.toString());
    await setDoc(orderRef, order);
    console.log("New order created with ID:", order.id);
    return order;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
}


const orderService = {
  addOrder
}

export default orderService;