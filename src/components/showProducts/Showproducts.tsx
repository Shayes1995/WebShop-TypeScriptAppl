import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProducts } from '../../storage/slices/productSlice';
import { AppDispatch, RootState } from '../../storage/store'; 
import { Link } from "react-router-dom"
import './Showproducts.css'

const Showproducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products: Items[] = useSelector((state: RootState) => state.products.productList);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAsyncProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-container">
      {products.map((product: Items) => (
        <div key={product.id} className="product">
          <div className="product-image-container">
            <img src={product.ImgURLone} alt={`${product.productName} `} />
          </div>
          <div className="product-details">
            <h2>{product.productName}</h2>
            <div>Article number: {product.id}</div>
            <div>Price: {product.price} SEK</div>
          </div>
          <div className="buttonDetail">
            <Link to={`/products/${product.cathegory}/${product.id}`}>Detaljer</Link>
          </div>
        </div>
      ))}
    </div>
  );

};

export default Showproducts;
