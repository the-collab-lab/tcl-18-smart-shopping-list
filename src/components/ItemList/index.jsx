import React, { useState, useEffect } from 'react';
import { updateItemDate } from '../Utils/firestore';
import { isWithin24hours } from 'components/Utils/helpers';

function ItemList({ itemName, docId, lastPurchasedDate }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [token] = useState(() => window.localStorage.getItem('tcl18-token'));

  useEffect(() => {
    if (isWithin24hours(lastPurchasedDate)) {
      setIsChecked(false);
      setIsDisabled(false);
    } else {
      setIsChecked(true);
      setIsDisabled(true);
    }
  }, [lastPurchasedDate]);

  const MarkProductPurshased = (id) => {
    updateItemDate(token, id)
      .then(() => {
        console.log('product updated');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckbox = (event) => {
    setIsChecked(!isChecked);
    if (event.target.checked) {
      MarkProductPurshased(docId);
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
