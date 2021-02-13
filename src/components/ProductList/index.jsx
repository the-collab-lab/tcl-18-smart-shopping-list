import React from 'react';
import ItemList from 'components/ItemList';
import { getProductStatus, sortProducts } from 'components/Utils/helpers';
function ProductList({ products }) {
  return (
    <>
      {products && (
        <div>
          {(products || [])
            .sort((a, b) => sortProducts(a, b))
            .map((product) => (
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
