import React, { useState } from 'react';
import { addProduct, getProducts } from 'components/Utils/firestore.js';
import { useCollection } from 'react-firebase-hooks/firestore';
import { isProductDuplicated } from 'components/Utils/helpers';
import './styles.css';
export const FormProduct = () => {
  const query = getProducts();
  const [products] = useCollection(query);
  const initialStateProduct = {
    item: '',
    creationDate: null,
    nextPurchase: 0,
    lastPurchasedDate: null,
    numberOfPurchases: 0,
    estimatedDaysNextPurchase: null,
  };
  const [product, setProduct] = useState(initialStateProduct);
  const [error, setError] = useState('');
  const handleInputProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    setError(
      e.target.value ? (
        ''
      ) : (
        <span aria-live="polite">All fields are required</span>
      ),
    );
  };
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const { item, nextPurchase } = product;
    if (isProductDuplicated(products, item))
      return setError('The item is already on the list');
    const editedProduct = {
      ...product,
      nextPurchase: Number(nextPurchase),
      creationDate: new Date(),
    };
    addProduct(editedProduct);
    setProduct({ ...initialStateProduct });
  };
  return (
    <div className="d-flex justify-content-center container-form">
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmitProduct} className="form-group">
        <div className="form-group">
          <label className="form-text" htmlFor="Item-Name">
            Item name:
          </label>
          <input
            className="form-control"
            id="Item-Name"
            onChange={handleInputProduct}
            type="text"
            placeholder="Add a Product"
            autoComplete="off"
            required="required"
            name="item"
            value={product.item}
          />
        </div>
        <div className="mt-3 mb-3">
          <p className="form-text">How soon will you buy this again?</p>
          <div className="d-flex justify-content-around radio-buttons">
            <input
              onChange={handleInputProduct}
              type="radio"
              required="required"
              name="nextPurchase"
              value={6}
              id="option-soon"
            />
            <label className="btn btn-soon" htmlFor="option-soon">
              Soon
              <br />
              (1-6 days)
            </label>
            <input
              onChange={handleInputProduct}
              type="radio"
              required="required"
              name="nextPurchase"
              value={14}
              id="option-kind"
            />
            <label className="btn btn-kind" htmlFor="option-kind">
              Kind Of Soon
              <br />
              (7-14 days)
            </label>
            <input
              onChange={handleInputProduct}
              type="radio"
              required="required"
              name="nextPurchase"
              value={31}
              id="option-not-soon"
            />
            <label className="btn btn-not-soon" htmlFor="option-not-soon">
              Not Soon
              <br />
              (15-31 days)
            </label>
          </div>
        </div>
        <button className="btn w-100 btn-addItem" type="submit">
          <i className="bi bi-cart-plus-fill form-icon"></i>
        </button>
      </form>
    </div>
  );
};