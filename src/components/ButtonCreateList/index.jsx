import React from 'react';
import getToken from 'lib/tokens';
import { useHistory } from 'react-router-dom';

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
        <h1 className="card-title">Welcome to your smart shopping list!</h1>
        <h3 className="card-text">
          Tap "Create shopping list" to get started.
        </h3>
        <button className="btn-primary" onClick={createNewList}>
          Create shopping list
        </button>
      </div>
    </div>
  );
}

export default ButtonCreateList;
