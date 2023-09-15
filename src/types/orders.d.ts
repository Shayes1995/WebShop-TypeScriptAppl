declare interface Order {
  id: string;
  orders: CartItem[];
  total: number;
  createdAt: string;
}