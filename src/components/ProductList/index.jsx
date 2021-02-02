import React from 'react';
import ItemList from 'components/ItemList';

function ProductList({ products }) {
  return (
    <>
      {products && (
        <div>
          {(products.docs || []).map((doc) => (
            <div key={doc.id}>
              <ItemList
                itemName={doc.data().item}
                docId={doc.id}
                nextPurchase={doc.data().nextPurchase}
                lastPurchasedDate={doc.data().lastPurchasedDate || ''}
                numberOfPurchases={doc.data().numberOfPurchases}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default ProductList;
