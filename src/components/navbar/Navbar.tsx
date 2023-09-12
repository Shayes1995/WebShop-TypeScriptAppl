import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'

import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {




  return (
    <>
      <nav className='navbar'>
        <ul className="navbar-ul">
          <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
          <li><NavLink className='nav-link' to='/products'>Products</NavLink></li>
          <li><NavLink className='nav-link' to='/add-product'>Add Product</NavLink></li>
          <li><NavLink className='nav-link' to='/checkout'><AiOutlineShoppingCart /></NavLink></li>
        </ul>

      </nav>
    </>
  )
}

export default Navbar