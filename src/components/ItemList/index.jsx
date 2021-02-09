import React, { useState, useEffect } from 'react';
import { updateItemDate } from '../Utils/firestore';
import { isWithin24hours, latestInterval } from 'components/Utils/helpers';
import calculateEstimate from 'lib/estimates';
import { deleteItem } from '../Utils/firestore';
import Prompt from 'components/Prompt';

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
  const [displayPrompt, setDisplayPrompt] = useState(false);

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
  const markProductPurchased = (
    id,
    lastPurchasedDateMillis,
    nextPurchaseEstimatedByUser,
    actualNumberOfPurchases,
    lastEstimateNextPurchase,
  ) => {
    const daysLatestInterval = latestInterval(
      lastPurchasedDateMillis,
      actualNumberOfPurchases,
      nextPurchaseEstimatedByUser,
    );
    const estimatedNextPurchase = calculateEstimate(
      lastEstimateNextPurchase,
      daysLatestInterval,
      actualNumberOfPurchases,
    );
    updateItemDate(token, id, actualNumberOfPurchases, estimatedNextPurchase)
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
      markProductPurchased(
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

      <Prompt
        isShowed={displayPrompt}
        toggleModal={setDisplayPrompt}
        deleteAction={() => deleteItem(token, docId)}
      >
        {'Are you sure you want to delete this item?'}
      </Prompt>
      <button onClick={() => setDisplayPrompt(true)}>Delete</button>
    </>
  );
}
export default ItemList;
