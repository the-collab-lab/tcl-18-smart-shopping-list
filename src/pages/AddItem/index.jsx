import { FormProduct } from 'components/FormProduct';
import React from 'react';
import Nav from 'components/Nav';
import './styles.css';

function AddItem() {
  return (
    <div className="add-item mt-4">
      <FormProduct />
      <Nav />
    </div>
  );
}

export default AddItem;
