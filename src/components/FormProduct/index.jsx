import React, { useState } from 'react';
import { addProduct } from 'components/Utils/firestore.js';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getProducts } from 'components/Utils/firestore';

export const FormProduct = () => {
  const query = getProducts();
  const [values] = useCollection(query);
  const initialStateProduct = {
    item: '',
    nextPurchase: 0,
    lastPurchasedDate: null,
  };

  const [product, setProduct] = useState(initialStateProduct);

  const [error, setError] = useState('');

  const handleInputProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    setError(e.target.value ? '' : 'All fields are required') //Valida al momento de cada cambio
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const { item, nextPurchase, lastPurchasedDate } = product;

    if (item.trim() === '' || nextPurchase === 0) {
      setError('All fields are required'); //Valida inmediato, al momento del clic
      return;
    }

    // setError('');
    const normalizedItem = item
      .trim()
      .toLowerCase()
      .replace(/[a-zA-Z]+/g, '')
    const items = values.docs.map((doc) => doc.data().item)
    const existCurrentItem = items.find((citem) => citem === normalizedItem)

    if (existCurrentItem) {
      setError('Ya existe este item')
      return 
    } 

    const editedProduct = {
      item,
      nextPurchase: Number(nextPurchase),
      lastPurchasedDate,
    };
    addProduct(editedProduct);
    setProduct({ ...initialStateProduct });
  };

  return (
    <div>
      {error && <p>{error}</p> }
      <form onSubmit={handleSubmitProduct}>
        <div>
          <label>Item name: </label>
          <input
            onChange={handleInputProduct}
            type="text"
            placeholder="Add A Product"
            autoComplete="off"
            name="item"
            value={product.item}
          />
        </div>
        <div>
          <label>How soon will you buy this again?</label>
          <br />
          <input
            onChange={handleInputProduct}
            type="radio"
            name="nextPurchase"
            value={7}
          />
          Soon
          <br />
          <input
            onChange={handleInputProduct}
            type="radio"
            name="nextPurchase"
            value={14}
          />
          Kind Of Soon
          <br />
          <input
            onChange={handleInputProduct}
            type="radio"
            name="nextPurchase"
            value={30}
          />
          Not Soon
          <br />
        </div>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};
