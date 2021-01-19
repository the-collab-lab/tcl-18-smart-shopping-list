import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from 'lib/firebase';
function FormJoinList() {
  const history = useHistory();
  const [userToken, setUserToken] = useState('');
  const [onNotification, setOnNotification] = useState(false);
  const checkTokenInFirebase = (e) => {
    e.preventDefault();
    console.log(userToken);
    if (userToken !== '') {
      var listByToken = db.collection(userToken);
      if (listByToken !== null) {
        console.log(listByToken);
        localStorage.setItem('tcl18-token', userToken);
        history.push('/list-view');
      } else {
        setUserToken('');
        setOnNotification(true);
      }
    } else {
      setUserToken('');
      setOnNotification(true);
    }
  };
  useEffect(() => {
    if (onNotification) {
      setTimeout(() => {
        setOnNotification(false);
      }, 3000);
    }
  }, [onNotification]);
  return (
    <>
      <form onSubmit={checkTokenInFirebase}>
        <label>
          <input
            type="text"
            placeholder="Enter a token"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
          />
        </label>
        <input type="submit" value="Join List" />
      </form>
      {onNotification && <p>'Invalid Token. Try again!'</p>}
    </>
  );
}
export default FormJoinList;
