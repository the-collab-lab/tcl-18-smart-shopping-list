import React from 'react';
import ItemList from 'components/ItemList';
import {getProductStatus} from 'components/Utils/helpers';

function ProductList({ products }) {
  const sortedProducts = products.sort ((a, b) => {
    if(a.item.toLowerCase() < b.item.toLowerCase()) { return -1; }
    if(a.item.toLowerCase() > b.item.toLowerCase()) { return 1; }
    return 0;
  })

  return (
    <>
      {products && (
        <div>
          {(sortedProducts || []).map((product) => (
            <div key={product.id}>
              <ItemList
                status={getProductStatus(product)}
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
