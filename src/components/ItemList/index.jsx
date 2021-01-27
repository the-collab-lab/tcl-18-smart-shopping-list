import React, { useState } from 'react';
import { updateItemDate } from '../Utils/firestore';

function ItemList({ itemName, docId }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [token] = useState(() => window.localStorage.getItem('tcl18-token'));
  const toggle = () => setIsChecked(!isChecked);

  const editProduct = (id) => {
    updateItemDate(token, id).then(() => console.log('product updated'));
  };

  //TODO
  // crear un metodo que tome la fecha y comparala con la fecha actual
  // condicional que bloque o desbloquee

  const handleCheckbox = (event) => {
    toggle();
    if (event.target.checked) {
      editProduct(docId);
      setIsDisabled(true);
    }
  };

  return (
    <>
      <span>
        <input
          type="checkbox"
          checked={isChecked}
          value={itemName}
          onChange={handleCheckbox}
          disabled={isDisabled}
        />

        {itemName}
      </span>
    </>
  );
}

export default ItemList;
