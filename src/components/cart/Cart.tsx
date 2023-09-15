import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../storage/store';
import { updateItemQuantity, removeItemFromCart, clearCart } from '../../storage/slices/cartSlice';
import { addOrderAsync } from '../../storage/slices/orderSlice';
import { AppDispatch } from '../../storage/store';
import './Cart.css';



const Cart: React.FC = () => {

  // cartItems is an array of CartItem objects
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const [orderPlacedMessage, setOrderPlacedMessage] = useState<string | null>(null);

  // this function is for incrementing and decrementing the quantity of the product in the cart
  const handleQuantityChange = (id: string, changeType: 'increment' | 'decrement') => {
    // this code line below at 22 is for finding the product in the cart with its id
    const item = cartItems.find(item => item.id === id);
    //this decrease or increase the quantity of a product in the cart
    if (item) {
      let newQuantity = changeType === 'increment' ? item.quantity + 1 : item.quantity - 1;
      //this line wont allow the quantity to be less than 1
      newQuantity = Math.max(newQuantity, 1); 
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };

  // this function is for removing the product from the cart with its id
  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  // this function is for adding the order 
  const handleAddOrder = async () => {
    try {
      // If the cart is empty, don't add the order
      if (cartItems.length === 0) {
        console.log('Cart is empty. No order will be created.');
        return;
      }

      // Create a orderItems array
      const orderItems: CartItem[] = cartItems.map(item => ({
        id: item.id,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        ImgURLone: item.ImgURLone
      }));

      console.log('OrderItems:', orderItems);



      // create a order object adding timestamp and random uuid, orderItems and total price
      const order: Order = {
        id: uuidv4(),
        orders: orderItems, 
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        createdAt: new Date().toISOString()
      };

      console.log('order:', order);
      // add the order to the db async 
      await dispatch(addOrderAsync(order));
      console.log('order was created');
      // clear the cart
      dispatch(clearCart());
      // show the order placed message if succed with timer 3sek
      setOrderPlacedMessage("your order has been placed");
      setTimeout(() => setOrderPlacedMessage(null), 3000);
    } catch (error) {
      console.log('failed to add order: ', error);
    }
  };


  //calulate the sum of products in total
  const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      {orderPlacedMessage ? (
        <h2 className="order-placed-message">{orderPlacedMessage}</h2>
      ) : cartItems.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className='cart-box'>
                <img src={item.ImgURLone} alt={item.productName} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">Product Name: {item.productName}</p>
                  <p className="cart-item-price">Price: {item.price} SEK</p>
                  <div className="cart-item-quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, 'decrement')} className="quantity-button">-</button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 'increment')} className="quantity-button">+</button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="delete-button">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="total-sum">
        <strong>Total: {totalSum} SEK</strong>
      </div>
      <button onClick={handleAddOrder}>Add Order</button>
    </div>
  );
};

export default Cart;

