import React from 'react';
import ItemList from 'components/ItemList';

function ProductList({ values, products }) {
  return products ? (
    <div>
      {values && (
        <div>
          {products.values.docs.map((doc) => (
            <div key={doc.id}>
              <ItemList
                itemName={doc.data().item}
                docId={doc.id}
                lastPurchasedDate={doc.data().lastPurchasedDate || ''}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  ): null;
}

export default ProductList;
