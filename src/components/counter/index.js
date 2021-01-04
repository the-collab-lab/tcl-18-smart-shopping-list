import React from 'react';

import { db } from '../../lib/firebase.js';

function Counter({ id, name, currentValue }) {
  const incrementValue = () => {
    // + 1
    currentValue = currentValue + 1;
    // Update value in Firebase
    var counterRef = db.collection('counters').doc(id);

    counterRef
      .update({
        value: currentValue,
      })
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  const resetValue = () => {
    currentValue = 0;
    // Update value in Firebase
    var counterRef = db.collection('counters').doc(id);

    counterRef
      .update({
        value: currentValue,
      })
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  return (
    <div>
      <span>
        {name}: {currentValue}
      </span>
      <br />
      <button onClick={incrementValue}>+</button>
      <button onClick={resetValue}>Reset</button>
    </div>
  );
}

export default Counter;
