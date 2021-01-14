import React, { useState } from 'react';
import { addProduct } from 'components/Utils/firestore.js';

export const FormProduct = () => {
  const inicialStateProduct = {
    item: '',
    nextPurchase: 0,
    LastPurchasedDate: null,
  };

  const [products, setProduct] = useState(inicialStateProduct);

  const handleInputProduct = (e) => {
    setProduct({
      ...products,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    let { item, nextPurchase, LastPurchasedDate } = products;
    const editedProduct = {
      item,
      nextPurchase: Number(nextPurchase),
      LastPurchasedDate,
    };
    addProduct(editedProduct);
    console.log(editedProduct);
    setProduct({ ...inicialStateProduct });
  };

  return (
    <form onSubmit={handleSubmitProduct}>
      <div>
        <label>Item name: </label>
        <input
          onChange={handleInputProduct}
          type="text"
          placeholder="Add A Product"
          autoComplete="off"
          name="item"
          value={products.item}
        />
      </div>
      <div>
        <label>How soon will you buy this again?</label>
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
  );
};
