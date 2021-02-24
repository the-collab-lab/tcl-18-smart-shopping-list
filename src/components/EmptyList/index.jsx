import React from 'react';
import { Link } from 'react-router-dom';
import 'components/EmptyList/styles.css';
import bag from 'components/EmptyList/bag.png';

function EmptyList() {
  return (
    <section className="empty-message">
      <img className="bag" src={bag} alt="bag" />
      <h3>Your shopping list is currently empty!</h3>
      <Link className="link-add" to="/add-item">
        Go ahead and add items to your list
      </Link>
    </section>
  );
}

export default EmptyList;
