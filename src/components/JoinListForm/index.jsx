import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { existCollectionByToken } from 'components/Utils/firestore';

function JoinListForm() {
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
      <form onSubmit={joinToListShared}>
        <label>
          <input
            type="text"
            placeholder="Enter a token"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            onKeyPress={() => setShowErrorMessage(false)}
          />
        </label>
        <input type="submit" value="Join List" />
      </form>
      {loading ? <p aria-live="polite">Checking token shared.</p> : ''}
      {showErrorMessage ? (
        <p aria-live="assertive">Invalid Token. Try again!.</p>
      ) : (
        ''
      )}
    </div>
  );
}
export default JoinListForm;
