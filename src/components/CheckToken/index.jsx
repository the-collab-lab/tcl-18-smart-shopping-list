import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CheckToken() {
  let history = useHistory();

  const [storedToken] = useState(() => localStorage.getItem('tcl18-token'));
  const [userToken, setUserToken] = useState('');
  const [isAuth, setIsAuth] = useState(true);
  const [onNotification, setOnNotification] = useState(false);

  const compareTokens = (token) => {
    let currentToken = token;
    if (storedToken === currentToken) {
      history.push('/list-view');
      setIsAuth(true);
    } else {
      setUserToken('');
      setOnNotification(true);
      setIsAuth(false);
      history.push('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userToken);
    compareTokens(userToken);
  };

  useEffect(() => {
    if (onNotification) {
      setTimeout(() => {
        setOnNotification(false);
        setIsAuth(false);
      }, 3000);
    }
  }, [isAuth, onNotification]);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
      {!isAuth && onNotification && <p>'Invalid Token. Try again!'</p>}
    </>
  );
}

export default CheckToken;
