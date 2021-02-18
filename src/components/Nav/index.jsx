import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css';

function Nav() {
  return (
    <nav className="App-Navbar-Bottom fixed-bottom">
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item border border-1 border-end border-white">
          <NavLink
            to="/list-view"
            activeClassName="selected"
            className="nav-link p-2"
          >
            <span className="nav-item-content">
              <i className="bi bi-list-check nav-icon"></i>
              <span className="nav-text">List</span>
            </span>
          </NavLink>
        </li>
        <li className="nav-item border">
          <NavLink
            to="/add-item"
            activeClassName="selected"
            className="nav-link p-2"
          >
            <span className="nav-item-content">
              <i className="bi bi-cart-plus-fill nav-icon"></i>
              <span className="nav-text">Add Item</span>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
