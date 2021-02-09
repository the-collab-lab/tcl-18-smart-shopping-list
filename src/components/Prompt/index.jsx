import React from 'react';

function Prompt({ isShowed, children, deleteAction, toggleModal }) {
  return (
    isShowed && (
      <div className="prompt">
        <br />
        {children}
        <div className="buttons">
          <button onClick={deleteAction}>OK</button>
          <button onClick={() => toggleModal(false)}>Cancel</button>
        </div>
        <br />
      </div>
    )
  );
}

export default Prompt;
