import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProducts } from '../../storage/slices/productSlice';
import { AppDispatch, RootState } from '../../storage/store';
import { Link } from "react-router-dom";
import { addItemToCart } from '../../storage/slices/cartSlice';
import { isExtendedItems } from '../../typeGuards/typeGuards';
import './Showproducts.css';
import Loader from '../loader/Loader';




//showproducts is a component that displays all products that we fetch from the db in firebase
const Showproducts: React.FC<ShowproductsProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  //this useState is used to filter the products by cathegory
  const [selectedCathegory, setSelectedCathegory] = useState<Cathegory>('');

  //useEffect so that we fetch the products from the db when the page loads
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAsyncProducts());
    }
  }, [status, dispatch]);

  // handlecathegoryfilter filters the products by cathegory
  const handleCathegoryFilter = (cathegory: Cathegory) => {
    setSelectedCathegory(cathegory);
  };
//filteredproducts works in a way that if there is a selected cathegory
  const filteredProducts = selectedCathegory ? products.filter(product => product.cathegory === selectedCathegory) : products;

  //displaying a loader while the products are being fetched
  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  //handleaddtocart is a function that adds the product to the cart 
  const handleAddToCart = (product: any) => {
    //isExtendedItems is a type guard that checks if the product is valid
    if (isExtendedItems(product)) {
      console.log('type guard passed, adding to cart...', isExtendedItems(product));
      dispatch(
        addItemToCart({
          id: product.id,
          productName: product.productName,
          price: product.price,
          ImgURLone: product.ImgURLone,
          quantity: 1,
        })
      );
    } else {
      console.error("Invalid product object");
    }
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