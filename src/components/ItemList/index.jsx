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
    <div className="card border-0 d-flex flex-row align-items-center justify-content-between mb-2">
      <input
        aria-label={message}
        className="checkbox checkbox-main"
        type="checkbox"
        name={itemName}
        checked={isChecked}
        value={itemName}
        onChange={handleCheckbox}
        disabled={isDisabled}
      />

      <label htmlFor={itemName} className={classes}>
        {itemName}
      </label>
      <div>
        {status === 'soon' && (
          <i className="fas fa-running icon-soon" style={{ fontSize: 24 }}></i>
        )}
        {status === 'kind-soon' && (
          <i
            className="fas fa-hourglass-half icon-kind-soon"
            style={{ fontSize: 24 }}
          ></i>
        )}
        {status === 'not-soon' && (
          <i className="fas fa-spa icon-not-soon" style={{ fontSize: 24 }}></i>
        )}
        {status === 'inactive' && (
          <i
            className="fas fa-bell-slash icon-inactive"
            style={{ fontSize: 24 }}
          ></i>
        )}

        <button
          className="btn-delete-item"
          aria-label="Button to delete item"
          onClick={openDialogDeleteItem}
        >
          <i className="bi bi-trash" style={{ fontSize: 24 }}></i>
        </button>
      </div>
    </div>
  );
}

export default ItemList;
