import React from 'react';

function ProductList({ values }) {
  return (
    <div>
      {values && (
        <span>
          <div>
            {values.docs.map((doc) => (
              <div key={doc.id}>
                <p>{doc.data().item}</p>
              </div>
            ))}
          </div>
        </span>
      )}
    </div>
  );
}

export default ProductList;
