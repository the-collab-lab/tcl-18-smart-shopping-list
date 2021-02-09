import React, { useState, useEffect } from 'react';
import { isWithin24hours, isDateValid } from 'components/Utils/helpers';
import { markProductPurchased, deleteItem } from 'components/Utils/firestore';

function ItemList({
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
  const [showPopup, setShowPopup] = useState(false);

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

  return (
    <div>
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
      <button onClick={() => setShowPopup(true)}>Delete</button>
      <br />
      {showPopup && (
        <div>
          <p>
            Are you sure you want to delete this item:{' '}
            <b>
              <i>{itemName}</i>
            </b>{' '}
            ?
          </p>
          <div>
            <button onClick={() => deleteItem(token, docId)}>Yes</button>
            <button onClick={() => setShowPopup(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemList;
