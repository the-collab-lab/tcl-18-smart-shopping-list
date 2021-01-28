import React from 'react';
import { useHistory } from 'react-router-dom';

function EmptyList() {
  const history = useHistory();

  const goToAddItemView = () => {
    history.push('/add-item');
  };

  return (
    <section>
      <p>Your shopping list is currently empty.</p>
      <button onClick={goToAddItemView}>Add Item</button>
    </section>
  );
}

export default EmptyList;
