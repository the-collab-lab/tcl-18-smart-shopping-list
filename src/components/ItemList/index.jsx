import React, { useState } from 'react';

function ItemList({ itemName, docId }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const toggle = () => setIsChecked(!isChecked);

  const editProduct = (product, id) => {
    console.log(product, id);
    //usar el servicio de FB para editar
    /*{
            producto,
            fecha: Date.now();
        }*/
  };

  //TODO
  // crear un metodo que tome la fecha y comparala con la fecha actual
  // condicional que bloque o desbloquee

  const handleCheckbox = (event) => {
    toggle();
    if (event.target.checked) {
      editProduct(event.target.value, docId);
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
