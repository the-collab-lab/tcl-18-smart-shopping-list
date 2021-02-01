import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getProducts } from 'components/Utils/firestore';
import { convertCollectionToArray } from 'components/Utils/helpers';
import ProductList from 'components/ProductList';
import EmptyList from 'components/EmptyList';

function ListView() {
  const [nameFilter, setNameFilter] = useState('');
  const query = getProducts();
  const [values, loading, error] = useCollection(query);
  const handleInput = (e) => setNameFilter(e.target.value);
  const resetFilter = () => setNameFilter('');

  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    const collectionProducts = values ? values.docs : [];
    const arrayProducts = convertCollectionToArray(collectionProducts);
    setProductsFiltered(arrayProducts);
    if (!loading && nameFilter.length > 0) {
      const p = arrayProducts.filter((product) =>
        product.item.includes(nameFilter),
      );
      setProductsFiltered(
        arrayProducts.filter((product) => product.item.includes(nameFilter)),
      );
    }
  }, [nameFilter, values, loading]);

  return (
    <div>
      <h2>Smart Shopping List</h2>
      <br />
      <form onReset={resetFilter}>
        <label htmlFor="nameFilter">Filter items</label>
        <input
          type="text"
          id="nameFilter"
          placeholder="Start typing here..."
          onChange={handleInput}
        />
        <input type="reset" value="Clear" />
      </form>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <p>List: Loading...</p>}
      {/* {!loading ? (
        <EmptyList />
      ) : (
          <ProductList products={productsFiltered} />
        )} */}
      <ProductList products={productsFiltered} />
    </div>
  );
}
export default ListView;
