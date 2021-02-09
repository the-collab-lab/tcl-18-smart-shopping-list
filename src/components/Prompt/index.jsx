import React from 'react';

function Prompt({ isShowed, children, deleteAction, toggleModal }) {
  return (
    isShowed && (
      <div className="prompt">
        {children}
        <button onClick={deleteAction}>OK</button>
        <button onClick={() => toggleModal(false)}>Cancel</button>
      </div>
    )
  );
}

export default Prompt;
