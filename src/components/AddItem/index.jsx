import { FormProduct } from 'components/FormProduct';
import React from 'react';

function AddItem() {
  return (
    <div>
      <h1>Smart Shopping list</h1>
      <FormProduct tokenID="exampleToken" />
    </div>
  );
}

export default AddItem;
