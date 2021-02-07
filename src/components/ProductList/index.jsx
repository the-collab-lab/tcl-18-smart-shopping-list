import React from 'react';
import ItemList from 'components/ItemList';

function ProductList({ products }) {
  return (
    <>
      {products && (
        <div>
          {(products || []).map((product) => (
            <div key={product.id}>
              <ItemList
                itemName={product.item}
                docId={product.id}
                nextPurchase={product.nextPurchase}
                lastPurchasedDate={product.lastPurchasedDate || ''}
                numberOfPurchases={product.numberOfPurchases}
                estimatedDaysNextPurchase={product.estimatedDaysNextPurchase}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default ProductList;
