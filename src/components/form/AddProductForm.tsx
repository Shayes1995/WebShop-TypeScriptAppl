import './Addproductform.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../storage/store';
import { addAsyncProduct } from '../../storage/slices/productSlice';



const AddProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [cathegory, setCathegory] = useState<Cathegory>('')
  const [imgURLone, setImgURLone] = useState('');
  const [imgURLtwo, setImgURLtwo] = useState('');
  const [imgURLthree, setImgURLthree] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = Date.now().toString();

    const newProduct: Items = {
      id,
      productName,
      description,
      price: parseFloat(price),
      cathegory: cathegory,
      ImgURLone: imgURLone,
      ImgURLtwo: imgURLtwo,
      ImgURLthree: imgURLthree,
    };


    try {
      await dispatch(addAsyncProduct(newProduct));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <form className='addproductform' onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product name</label>
          <input
            id="product-name"
            className='input-product'
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-description">Description</label>
          <textarea
            id="product-description"
            className='input-product'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            id="product-price"
            className='input-product'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            className='input-product'
            value={cathegory}
            onChange={(e) => setCathegory(e.target.value as Cathegory)}
          >
            <option value="">Select a category</option>
            <option value="Sweater">Sweater</option>
            <option value="Jacket">Jacket</option>
            <option value="Shoes">Shoes</option>
            <option value="Jeans">Jeans</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>


        <div className="input-group">
          <label htmlFor="product-img-url-1">IMG URL 1</label>
          <input
            id="product-img-url-1"
            className='input-product'
            type="text"
            value={imgURLone}
            onChange={(e) => setImgURLone(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-img-url-2">IMG URL 2</label>
          <input
            id="product-img-url-2"
            className='input-product'
            type="text"
            value={imgURLtwo}
            onChange={(e) => setImgURLtwo(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-img-url-3">IMG URL 3</label>
          <input
            id="product-img-url-3"
            className='input-product'
            type="text"
            value={imgURLthree}
            onChange={(e) => setImgURLthree(e.target.value)}
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );

}

export default AddProductForm


