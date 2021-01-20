import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { existCollectionByToken } from 'components/Utils/firestore';

function FormJoinList() {
  const history = useHistory();
  const [userToken, setUserToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const joinToListShared = async (e) => {
    e.preventDefault();
    setLoading(true);
    const existsCollection = await existCollectionByToken(userToken);
    setLoading(false);
    if (userToken !== '' && existsCollection) {
      localStorage.setItem('tcl18-token', userToken);
      history.push('/list-view');
    } else {
      setUserToken('');
      setShowErrorMessage(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={joinToListShared}
        aria-label="Form for enter a token shared"
      >
        <label>
          <input
            type="text"
            placeholder="Enter a token"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            onKeyPress={() => setShowErrorMessage(false)}
          />
        </label>
        <input type="submit" value="Join List" aria-label="Join List" />
      </form>
      <div
        role="region"
        id="tokenInfo"
        aria-label="App messages"
        aria-live="polite"
      >
        {loading ? (
          <p id="tokenChecking" aria-live="polite">
            Checking token shared.
          </p>
        ) : (
          ''
        )}
        {showErrorMessage ? (
          <p id="tokenInvalid" aria-live="assertive">
            Invalid Token. Try again!.
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default FormJoinList;
