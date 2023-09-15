import { db } from "../../firebaseSetup/config";
import { collection, doc, setDoc, getDoc, getDocs} from "firebase/firestore";


//this function adds the product to our collection called items in firebase
//the return type is a promise of type ExtendedItems from our type extensions 
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

//this function fetches all products from our collection called items in firebase
//the return type is a promise of type ExtendedItems from our type extensions
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

//this function fetches a specific product from our collection called items in firebase with the help of the product id
//the return type is a promise of type ExtendedItems from our type extensions
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


//this is the product service that we export
const productService = {
  addItem,
  fetchProducts,
  fetchProductDetails 
}

export default productService;
