import React from 'react';
import ItemList from 'components/ItemList';

function ProductList({ values }) {
  return (
    <div>
      {values && (
        <span>
          <div>
            {values.docs.map((doc) => (
              <div key={doc.id}>
                {/* <p>{doc.data().item}</p> */}
                <ItemList itemName={doc.data().item} docId={doc.id} />
              </div>
            ))}
          </div>
        </span>
      )}
    </div>
  );
}

export default ProductList;
