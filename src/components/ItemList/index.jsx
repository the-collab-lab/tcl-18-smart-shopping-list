import React, { useState, useEffect } from 'react';
import { updateItemDate } from '../Utils/firestore';
import { isWithin24hours } from 'components/Utils/helpers';
const { default: calculateEstimate } = require('lib/estimates');
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

  const latestInterval = () => {
    const currentDate = +new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    const dayInterval = Math.floor((currentDate - formattedDate) / oneDay);
    return numberOfPurchases === 0 ? nextPurchase : dayInterval;
  };
  const dayLatestInterval = latestInterval();

  const estimatedNextPurchase = calculateEstimate(
    estimatedDaysNextPurchase,
    dayLatestInterval,
    numberOfPurchases,
  );
  const MarkProductPurchased = (id) => {
    updateItemDate(token, id, numberOfPurchases, estimatedNextPurchase)
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
      MarkProductPurchased(docId);
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
