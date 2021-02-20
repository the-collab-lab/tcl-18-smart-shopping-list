import { FormProduct } from 'components/FormProduct';
import React from 'react';
import Nav from 'components/Nav';

function AddItem() {
  return (
    <div className="mt-5">
      <FormProduct />
      <Nav />
    </div>
  );
}

export default AddItem;
