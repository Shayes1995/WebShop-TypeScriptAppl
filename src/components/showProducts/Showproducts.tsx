import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProducts } from '../../storage/slices/productSlice';
import { AppDispatch, RootState } from '../../storage/store';
import { Link } from "react-router-dom";
import { addItemToCart } from '../../storage/slices/cartSlice';
import './Showproducts.css';
import Loader from '../loader/Loader';

interface ShowproductsProps {
  products: ExtendedItems[];
}

const Showproducts: React.FC<ShowproductsProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  const [selectedCathegory, setSelectedCathegory] = useState<Cathegory>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAsyncProducts());
    }
  }, [status, dispatch]);

  const handleCathegoryFilter = (cathegory: Cathegory) => {
    setSelectedCathegory(cathegory);
  };

  const filteredProducts = selectedCathegory ? products.filter(product => product.cathegory === selectedCathegory) : products;

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleAddToCart = (product: ExtendedItems) => {
    dispatch(
      addItemToCart({
        id: product.id,
        productName: product.productName,
        price: product.price,
        ImgURLone: product.ImgURLone,
        quantity: 1,
      })
    );
  };

  return (
    <div className="main-container">
      <div className="cathegory-buttons">
        <button onClick={() => handleCathegoryFilter('')}>All Products</button>
        <button onClick={() => handleCathegoryFilter('Sweater')}>Sweater</button>
        <button onClick={() => handleCathegoryFilter('Jacket')}>Jacket</button>
        <button onClick={() => handleCathegoryFilter('Shoes')}>Shoes</button>
        <button onClick={() => handleCathegoryFilter('Jeans')}>Jeans</button>
        <button onClick={() => handleCathegoryFilter('Accessories')}>Accessories</button>
      </div>
      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <div className="product-image-container">
              <img src={product.ImgURLone} alt={`${product.productName} `} />
            </div>
            <div className="product-details">
              <h2>{product.productName}</h2>
              <div>Article number: {product.id}</div>
              <div>Cathegory: {product.cathegory}</div> 
              <div>Price: {product.price} SEK</div>

              <div className="buttonContainer">
                <Link to={`/products/${product.cathegory}/${product.id}`} className="details-button">Details</Link>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showproducts;