import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../storage/slices/cartSlice';
import { AppDispatch } from '../../storage/store';
import { isValidProductDetails } from '../../typeGuards/typeGuards';
import './ShowProductDetails.css';

//showproductdetails is a component that shows the details of a product
const ShowProductDetails: React.FC<ShowProductDetailsProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  //handleAddToCart is a function that adds a product to the cart
  const handleAddToCart = () => {
    //isValidProductDetails is a type guard that checks if the product details are valid
    if (isValidProductDetails(product)) {
      console.log("Product details passed the type guard check, adding to cart...");
      //dispatchin addItemToCart so that the product is added to the cart in the redux store
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
      console.log("Invalid product details object, failed the type guard check.");
      console.log("Product object: ", product); // log the product object 
    }
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
            <p className="productCollectionYear">Article number: {product.id}</p> 
            <p className="productPrice">{product.price} SEK</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowProductDetails;



