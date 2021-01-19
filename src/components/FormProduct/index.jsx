import React, { useState } from 'react';
import { addProduct } from 'components/Utils/firestore.js';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getProducts } from 'components/Utils/firestore';

export const FormProduct = () => {
  const query = getProducts();
  const [products] = useCollection(query);

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
    setError(e.target.value ? '' : 'All fields are required') //Required field. Immediate validation
  };
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const { item, nextPurchase, lastPurchasedDate } = product;
    
    //Required field. Immediate validation
    // if (item.trim() === '' || nextPurchase === 0) {
    //   setError('All fields are required'); 
    //   return;
    // }

    //duplication validation
    const normalizedItemInput = item
      .trim()
      .toLowerCase()
      .match(/[^_\W]+/g)
      .join(' ');
    const productExists = () => {
      const normalizedItemsDb = products.docs.map((doc) =>
        doc
          .data()
          .item.trim()
          .toLowerCase()
          .match(/[^_\W]+/g)
          .join(' '),
      );
      return normalizedItemsDb.includes(normalizedItemInput);
    };

    if (productExists()) return setError('The item is already on the list');

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
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmitProduct}>
        <div>
          <label>Item name: </label>
          <input
            onChange={handleInputProduct}
            type="text"
            placeholder="Add A Product"
            autoComplete="off"
            required="required"
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
            required="required"
            name="nextPurchase"
            value={7}
          />
          Soon
          <br />
          <input
            onChange={handleInputProduct}
            type="radio"
            required="required"
            name="nextPurchase"
            value={14}
          />
          Kind Of Soon
          <br />
          <input
            onChange={handleInputProduct}
            type="radio"
            required="required"
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
