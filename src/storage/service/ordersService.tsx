import { db } from "../../firebaseSetup/config";
import { doc, setDoc } from "firebase/firestore";


//this function adds the order to our collection in firebase
//the return type is a promise of type order
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

//this is the order service that we export
const orderService = {
  addOrder
}

export default orderService;