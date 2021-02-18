import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { existCollectionByToken } from 'components/Utils/firestore';
import 'components/JoinListForm/styles.css'

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
    <div className="card text-center mt-4 mb-2">
      <div className="card-body">
        <h3 className="card-text">You can also join an existing shopping.</h3>
        <form onSubmit={joinToListShared}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a token"
              value={userToken}
              onChange={(e) => setUserToken(e.target.value)}
              onKeyPress={() => setShowErrorMessage(false)}
            />
            <button className="btn-success" type="submit">
              Join List
            </button>
          </div>
        </form>
      </div>
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
