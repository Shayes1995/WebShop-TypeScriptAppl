import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../storage/slices/cartSlice';
import { AppDispatch } from '../../storage/store';
import './ShowProductDetails.css';

interface ShowProductDetailsProps {
  product: ExtendedItems;
}

const ShowProductDetails: React.FC<ShowProductDetailsProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
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
    <div className="productContainer">
      {product && (
        <>
          <div className="imageContainer">
            <img src={product.ImgURLone} alt={`${product.productName}`} className="productImage" />
            <img src={product.ImgURLtwo} alt={`${product.productName}`} className="productImage" />
            <img src={product.ImgURLthree} alt={`${product.productName}`} className="productImage" />
          </div>
          <div className="productDetails">
            <h2 className="productName">{product.productName}</h2>
            <p className="productDescription">{product.description}</p>
            <p className="productBrand">Brand: {product.brand}</p> 
            <p className="productCollectionYear">Collection Year: {product.collectionYear}</p> 
            <p className="productPrice">{product.price} SEK</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowProductDetails;



