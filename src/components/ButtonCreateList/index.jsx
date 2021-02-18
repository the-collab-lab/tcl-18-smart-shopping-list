import React from 'react';
import getToken from 'lib/tokens';
import { useHistory } from 'react-router-dom';
import 'components/ButtonCreateList/styles.css';
import cart from 'components/ButtonCreateList/cart.svg';

function ButtonCreateList() {
  let history = useHistory();
  const createNewList = function () {
    const Token = getToken();
    localStorage.setItem('tcl18-token', Token);
    history.push('/list-view');
  };

  return (
    <div className="card text-center mt-4 mb-2">
      <div className="card-body">
        <img src={cart} alt="shopping cart logo" />
        <p className="card-text">Tap "Create shopping list" to get started</p>
        <button className="btn btn-primary" onClick={createNewList}>
          Create a new list
        </button>
      </div>
    </div>
  );
}

export default ButtonCreateList;
