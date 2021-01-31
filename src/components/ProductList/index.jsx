import React from 'react';
import ItemList from 'components/ItemList';

function ProductList({ products }) {
  console.log(products.values.docs);
  return products ? (
    <div>
      {(products.values.docs || []).map((doc) => (
        <div key={doc.id}>
          <ItemList
            itemName={doc.data().item}
            docId={doc.id}
            lastPurchasedDate={doc.data().lastPurchasedDate || ''}
          />
        </div>
      ))}
    </div>
  ) : null;
}

export default ProductList;
