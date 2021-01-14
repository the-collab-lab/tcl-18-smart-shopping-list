import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CheckToken() {
  let history = useHistory();

  const [storedToken] = useState(() => localStorage.getItem('Token'));
  const [userToken, setUserToken] = useState('');
  const [isAuth, setIsAuth] = useState(true);

  const compareTokens = (token) => {
    let currentToken = token;
    if (storedToken === currentToken) {
      history.push('/list-view');
      setIsAuth(true);
    } else {
      setUserToken('');
      history.push('/');
      setIsAuth(false);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(userToken);
    compareTokens(userToken);
  };
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
      {!isAuth && <p>'Invalid Token. Try again!'</p>}
    </>
  );
}

export default CheckToken;
