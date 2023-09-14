import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../storage/store';
import Showproducts from '../components/showProducts/Showproducts'

const Products = () => {
  const products = useSelector((state: RootState) => state.products.productList);

  return (
    <div>
      <Showproducts products={products} />
    </div>
  )
}

export default Products;
