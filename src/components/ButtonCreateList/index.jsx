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
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Welcome to Smart Shopping List</h5>
        <p className="card-text">Tap "Create shopping list" to get started</p>
        <button className="btn btn-primary" onClick={createNewList}>
          Create a new list
        </button>
      </div>
    </div>
  );
}

export default ButtonCreateList;
