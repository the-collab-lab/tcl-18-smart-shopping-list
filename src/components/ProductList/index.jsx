import React from 'react';

function ProductList({ products }) {
  return products ? (
    <div>
      {products.map((doc) => (
        <p key={doc.id}>{doc.data().item}</p>
      ))}
    </div>
  ) : null;
}

export default ProductList;
