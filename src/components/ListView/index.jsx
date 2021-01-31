import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getProducts } from 'components/Utils/firestore';
import EmptyList from 'components/EmptyList';
import ProductList from 'components/ProductList';

function ListView() {
  const query = getProducts();
  const [values, loading, error] = useCollection(query);

  return (
    <div>
      <h2>Smart Shopping List</h2>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <p>List: Loading...</p>}
      {!loading && values.empty ? (
        <EmptyList />
      ) : (
        <ProductList products={values ? values.docs : []} />
      )}
    </div>
  );
}
export default ListView;
