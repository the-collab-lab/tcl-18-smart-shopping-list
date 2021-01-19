import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateToken } from 'components/Utils/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

function FormJoinList() {
  const history = useHistory();
  const [userToken, setUserToken] = useState('');
  const [onNotification, setOnNotification] = useState(false);
  const query = validateToken(userToken || ' ');
  const [values] = useCollection(query);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    if (onNotification) {
      setTimeout(() => {
        setOnNotification(false);
      }, 3000);
    }
  }, [onNotification]);

  useEffect(() => {
    if (values) {
      setIsTokenValid(values.docs.length ? true : false);
    }
  }, [userToken, values]);

  const checkTokenInFirebase = (e) => {
    e.preventDefault();
    if (userToken !== '' && isTokenValid) {
      localStorage.setItem('tcl18-token', userToken);
      history.push('/list-view');
    } else {
      setUserToken('');
      setOnNotification(true);
    }
  };

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
      {onNotification && !isTokenValid ? <p>Invalid Token. Try again!</p> : ''}
    </>
  );
}
export default FormJoinList;
