import React, { useState, useEffect } from 'react';
import { updateItemDate } from '../Utils/firestore';
import { differenceInHours } from 'date-fns';

function ItemList({ itemName, docId, lastPurchasedDate }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [token] = useState(() => window.localStorage.getItem('tcl18-token'));

  const MarkProductPurshased = (id) => {
    updateItemDate(token, id)
      .then(() => {
        console.log('product updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (lastPurchasedDate && isDisabled === false) {
      const hoursAtTheMoment = differenceInHours(
        new Date(),
        lastPurchasedDate.toDate(),
      );
      setIsDisabled(hoursAtTheMoment <= 12);
      setIsChecked(hoursAtTheMoment <= 12);
    }
  }, [isDisabled, lastPurchasedDate]);

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
