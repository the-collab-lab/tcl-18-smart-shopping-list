import React, { useState, useEffect } from 'react';
import { updateItemDate } from '../Utils/firestore';
import { isWithin24hours } from 'components/Utils/helpers';

function ItemList({ itemName, docId, lastPurchasedDate }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [token] = useState(() => window.localStorage.getItem('tcl18-token'));
  const [formattedDate, setFormattedDate] = useState(0);

  useEffect(() => {
    let date;
    if (isDateValid(lastPurchasedDate)) {
      date = lastPurchasedDate;
      setFormattedDate(date.toMillis());
    }
    if (isWithin24hours(formattedDate)) {
      setIsChecked(false);
      setIsDisabled(false);
    } else {
      setIsChecked(true);
      setIsDisabled(true);
    }
  }, [formattedDate, lastPurchasedDate]);

  const isDateValid = (date) => {
    if (date) return true;
  };

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
      <label htmlFor={itemName}>
        <input
          type="checkbox"
          name={itemName}
          checked={isChecked}
          value={itemName}
          onChange={handleCheckbox}
          disabled={isDisabled}
        />

        {itemName}
      </label>
    </>
  );
}

export default ItemList;
