
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage/store';
import './navbar.css'

import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);



  return (
    <>
      <nav className='navbar'>
        <ul className="navbar-ul">
          <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
          <li><NavLink className='nav-link' to='/products'>Products</NavLink></li>
          <li><NavLink className='nav-link' to='/add-product'>Add Product</NavLink></li>
          <li>
            <NavLink className='nav-link' to='/checkout'>
              <div className="icon-container">
                <AiOutlineShoppingCart className='icon' />
                {cartItemCount > 0 && (
                  <span className="cart-item-count">{cartItemCount}</span>
                )}
              </div>
            </NavLink>
          </li>

        </ul>

      </nav>
    </>
  )
}

export default Navbar