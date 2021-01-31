import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getProducts } from 'components/Utils/firestore';
import ProductList from 'components/ProductList';
import EmptyList from 'components/EmptyList';

function ListView() {
  const query = getProducts();
  const [values, loading, error] = useCollection(query);

  return (
    <>
      <h2>Smart Shopping List</h2>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <p>List: Loading...</p>}
      </div>
      <ProductList values={values} />
      {!loading && values.empty ? (
        <EmptyList />
      ) : (
        <ProductList values={values} />
      )}
    </>
  );
}
export default ListView;
