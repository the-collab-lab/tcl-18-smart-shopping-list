import React, { useState } from 'react';
import { addProduct } from 'components/Utils/firestore.js';

export const FormProduct = () => {
  const initialStateProduct = {
    item: '',
    nextPurchase: 0,
    lastPurchasedDate: null,
  };

  const [product, setProduct] = useState(initialStateProduct);

  const [error, setError] = useState(false);

  const handleInputProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    let { item, nextPurchase, lastPurchasedDate } = product;

    if (item.trim() === '' || nextPurchase === 0) {
      setError(true);
      return;
    }

    setError(false);

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
      {error ? <p>All fields are required</p> : null}
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
