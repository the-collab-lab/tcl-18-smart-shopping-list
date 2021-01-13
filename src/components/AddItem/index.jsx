import { FormProduct } from 'components/FormProduct';
import { token } from 'components/Utils/localStorage';
import React from 'react';
function AddItem() {
  return (
    <div>
      <h1>Smart Shopping list</h1>
      <FormProduct tokenID={token} />
    </div>
  );
}

export default AddItem;
