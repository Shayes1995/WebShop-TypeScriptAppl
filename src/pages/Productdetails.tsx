import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAsyncProductDetails } from '../storage/slices/productSlice'
import { RootState, AppDispatch } from '../storage/store';
import ShowProductDetails from '../components/showDetails/ShowProductDetails';
import Loader from '../components/loader/Loader';

const Productdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) => state.products.productDetails);
  const status = useSelector((state: RootState) => state.products.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchAsyncProductDetails(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') {
    return <div><Loader /></div>;
  }

  if (status === 'failed') {
    return <div>Error loading product details</div>;
  }

  return (
    <div>
      {product && <ShowProductDetails product={product} />}
    </div>
  );
};

export default Productdetails;
