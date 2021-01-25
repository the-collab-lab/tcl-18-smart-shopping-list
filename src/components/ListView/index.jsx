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
      {loading && <span>List: Loading...</span>}
      {!loading && values.empty ? (
        <EmptyList />
      ) : (
        <ProductList values={values} />
      )}
    </div>
  );
}
export default ListView;
