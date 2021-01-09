import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css';

function Nav() {
  return (
    <nav className="navigator">
      <ul>
        <li>
          <NavLink to="/list-view" activeClassName="selected">
            List
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-item" activeClassName="selected">
            Add Item
          </NavLink>
        </li>
        <li>
          <NavLink to="/counter" activeClassName="selected">
            Counters
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
