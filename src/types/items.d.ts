

declare interface Items {
  id: string;
  productName: string;
  description: string;
  price: number;
  cathegory: Cathegory;
  ImgURLone: string;
  ImgURLtwo: string;
  ImgURLthree: string;
}

declare interface ExtendedItems extends Items {
  brand: string;
  collectionYear: number;
}




declare interface CartItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  ImgURLone: string;
}