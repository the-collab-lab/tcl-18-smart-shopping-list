import React from 'react';
import getToken from 'lib/tokens';
import { useHistory } from 'react-router-dom';
import 'components/ButtonCreateList/styles.css'

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
        <img src="https://www.flaticon.es/svg/vstatic/svg/3643/3643914.svg?token=exp=1613591247~hmac=b499938a0a24b229bea43142879095fb" alt="shopping cart logo"/>
        <p className="card-text">Tap "Create shopping list" to get started</p>
        <button className="btn btn-primary" onClick={createNewList}>
          Create a new list
        </button>
      </div>
    </div>
  );
}

export default ButtonCreateList;
