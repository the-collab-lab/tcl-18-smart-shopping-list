import React from 'react';
import ItemList from 'components/ItemList';

function ProductList({ products }) {
  return (
    <>
      {products && (
        <div>
          {(products || []).map((doc) => (
            <div key={doc.id}>
              <ItemList
                itemName={doc.item}
                docId={doc.id}
                lastPurchasedDate={doc.lastPurchasedDate || ''}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default ProductList;
