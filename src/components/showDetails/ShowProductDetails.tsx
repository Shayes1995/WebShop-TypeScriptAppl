import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProductDetails } from '../../storage/slices/productSlice';
import { AppDispatch, RootState } from '../../storage/store';
import './ShowProductDetails.css'

const ShowProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchAsyncProductDetails(id));
    }
  }, [id, dispatch]);

  const productDetails = useSelector((state: RootState) => state.products.productDetails);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="productContainer">
      {productDetails && (
        <>
          <div className="imageContainer">
            <img src={productDetails.ImgURLone} alt={`${productDetails.productName}`} className="productImage" />
            <img src={productDetails.ImgURLtwo} alt={`${productDetails.productName}`} className="productImage" />
            <img src={productDetails.ImgURLthree} alt={`${productDetails.productName} `} className="productImage" />
          </div>
          <div className="productDetails">
            <h2 className="productName">{productDetails.productName}</h2>
            <p className="productDescription">{productDetails.description}</p>
            <p className="productPrice">{productDetails.price} SEK</p>
          </div>
        </>
      )}
    </div>
  );

};

export default ShowProductDetails;
