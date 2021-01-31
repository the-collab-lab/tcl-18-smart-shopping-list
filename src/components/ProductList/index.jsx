import React from 'react';

function ProductList({ values }) {
  return (
    <>
      {values && (
        <div>
          {values.docs.map((doc) => (
            <p key={doc.id}>{doc.data().item}</p>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductList;
