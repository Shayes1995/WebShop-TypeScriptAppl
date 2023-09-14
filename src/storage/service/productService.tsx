import { db } from "../../firebaseSetup/config";
import { collection, doc, setDoc, getDoc, getDocs} from "firebase/firestore";



export async function addItem(items: ExtendedItems): Promise<ExtendedItems> {
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

export const fetchProducts = async (): Promise<ExtendedItems[]> => {
  try {
    const productsRef = collection(db, "items");
    const productsSnapshot = await getDocs(productsRef);
    const productsList = productsSnapshot.docs.map((doc) => doc.data() as ExtendedItems);
    return productsList;
  } catch (error) {
    console.error("Fel vid hämtning av products:", error);
    throw error;
  }
}

export const fetchProductDetails = async (productId: string): Promise<ExtendedItems> => {
  try {
    const productRef = doc(db, "items", productId);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      return productSnapshot.data() as ExtendedItems;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};



const productService = {
  addItem,
  fetchProducts,
  fetchProductDetails 
}

export default productService;
