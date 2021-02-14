import React, { useState, useEffect } from 'react';
import { isWithin24hours, isDateValid } from 'components/Utils/helpers';
import { markProductPurchased, deleteItem } from 'components/Utils/firestore';
import './styles.css';

function ItemList({
  status,
  itemName,
  docId,
  nextPurchase,
  lastPurchasedDate,
  numberOfPurchases,
  estimatedDaysNextPurchase,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formattedDate, setFormattedDate] = useState(0);
  const [token] = useState(() => window.localStorage.getItem('tcl18-token'));
  const classes = status ? `label--${status}` : '';
  const message = `You need to buy this ${status}`;

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

  const handleCheckbox = (event) => {
    setIsChecked(!isChecked);

    if (event.target.checked) {
      markProductPurchased(
        token,
        docId,
        formattedDate,
        nextPurchase,
        numberOfPurchases + 1,
        estimatedDaysNextPurchase,
      );
      setIsDisabled(true);
    }
  };

  const openDialogDeleteItem = () => {
    const answer = window.confirm(
      `Are you sure you want to delete this item: '${itemName}' ?`,
    );
    if (answer) {
      deleteItem(token, docId);
    }
  };

  return (
    <div>
      <label htmlFor={itemName} className={classes}>
        <input
          aria-label={message}
          type="checkbox"
          name={itemName}
          checked={isChecked}
          value={itemName}
          onChange={handleCheckbox}
          disabled={isDisabled}
        />

        {itemName}
      </label>
      <button aria-label="Button to delete item" onClick={openDialogDeleteItem}>
        Delete
      </button>
    </div>
  );
}

export default ItemList;
