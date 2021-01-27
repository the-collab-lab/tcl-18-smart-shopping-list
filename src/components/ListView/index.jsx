import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getProducts } from 'components/Utils/firestore';
import ProductList from 'components/ProductList';

function ListView() {
  const query = getProducts();
  const [values, loading, error] = useCollection(query);

  return (
    <>
      <h2>Smart Shopping List</h2>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>List: Loading...</span>}
      </div>
      <ProductList values={values} />
    </>
  );
}
export default ListView;
