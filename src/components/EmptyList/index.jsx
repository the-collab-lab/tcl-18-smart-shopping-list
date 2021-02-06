import React from 'react';
import { Link } from 'react-router-dom';

function EmptyList() {
  return (
    <section>
      <p>Your shopping list is currently empty.</p>
      <Link to="/add-item">Add Item</Link>
    </section>
  );
}

export default EmptyList;
