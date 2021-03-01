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
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [successSave, setSuccessMsg] = useState(false);
  const handleNameInput = (e) => {
    const clone = { ...product };
    clone.item = e.target.value;
    setProduct(clone);
    setError(false);
    setErrorMsg('');
    setSuccessMsg(false);
  };
  const handleRadioNextPurchase = (e) => {
    const clone = { ...product };
    clone.nextPurchase = e.target.value;
    setProduct(clone);
    setError(false);
    setErrorMsg('');
    setSuccessMsg(false);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const { item, nextPurchase } = product;

    if (item.length <= 0 && nextPurchase <= 0) {
      setError(true);
      setErrorMsg('Name and next purchase date are required');
      setSuccessMsg(false);
    } else if (item.length > 0) {
      if (nextPurchase > 0) {
        if (isProductDuplicated(products, item)) {
          setError(true);
          setErrorMsg('The item is already on the list');
        } else {
          const editedProduct = {
            ...product,
            nextPurchase: Number(nextPurchase),
            creationDate: new Date(),
          };
          addProduct(editedProduct);
          setProduct({ ...initialStateProduct });
          setError(false);
          setErrorMsg('');
          setSuccessMsg(true);
        }
      } else {
        setError(true);
        setErrorMsg('Next Purchase date is required');
        setSuccessMsg(false);
      }
    } else {
      setError(true);
      setErrorMsg('Name is required');
      setSuccessMsg(false);
    }
  };

  return (
    <div className="d-flex justify-content-center container-form w-100">
      <form onSubmit={handleSubmitProduct} className="w-100 p-2" noValidate>
        <div>
          <label className="form-text" htmlFor="Item-Name">
            Item name:
          </label>
          <input
            className="form-control"
            id="Item-Name"
            onChange={handleNameInput}
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
          <div className="radio-buttons" role="radiogroup">
            <input
              onChange={handleRadioNextPurchase}
              type="radio"
              required="required"
              name="options"
              value={6}
              id="option-soon"
              checked={product.nextPurchase === '6' ? true : false}
            />
            <label className="btn btn-soon" htmlFor="option-soon">
              <i className="bi bi-stopwatch-fill" style={{ fontSize: 24 }}></i>
              <br />
              (1-6 days)
            </label>
            <input
              onChange={handleRadioNextPurchase}
              type="radio"
              required="required"
              name="options"
              value={14}
              id="option-kind"
              checked={product.nextPurchase === '14'}
            />
            <label className="btn btn-kind" htmlFor="option-kind">
              <i
                className="bi bi-calendar2-week-fill"
                style={{ fontSize: 24 }}
              ></i>
              <br />
              (7-14 days)
            </label>
            <input
              onChange={handleRadioNextPurchase}
              type="radio"
              required="required"
              name="options"
              value={31}
              id="option-not-soon"
              checked={product.nextPurchase === '31'}
            />
            <label className="btn btn-not-soon" htmlFor="option-not-soon">
              <i className="bi bi-pin-angle-fill" style={{ fontSize: 24 }}></i>
              <br />
              (15-31 days)
            </label>
          </div>
        </div>
        {error && (
          <p aria-live="assertive" className="text-danger">
            {errorMsg}
          </p>
        )}
        {successSave && (
          <p aria-live="polite" className="text-success">
            Product added successfully!
          </p>
        )}
        <button className="btn w-100 btn-addItem" type="submit">
          <i className="bi bi-cart-plus-fill form-icon"></i>
        </button>
      </form>
    </div>
  );
};
