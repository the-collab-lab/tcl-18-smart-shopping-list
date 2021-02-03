import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  getProducts,
  convertCollectionToArray,
} from 'components/Utils/firestore';
import { isThereCoincidence } from 'components/Utils/helpers';
import ProductList from 'components/ProductList';
import EmptyList from 'components/EmptyList';

function ListView() {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const query = getProducts();
  const [values, loading, error] = useCollection(query);
  const handleInput = (e) => setNameFilter(e.target.value);

  useEffect(() => {
    const collectionProducts = values ? values.docs : [];
    const arrayProducts = convertCollectionToArray(collectionProducts);
    setProductsFiltered(arrayProducts);
    if (!loading && nameFilter.length > 0) {
      setProductsFiltered(
        arrayProducts.filter((product) =>
          isThereCoincidence(product.item, nameFilter),
        ),
      );
    }
  }, [nameFilter, values, loading]);
  
  const currentProducts = values ? values.docs : [];

  return (
    <div>
      <h2>Smart Shopping List</h2>
      <br />
      <form>
        {!!currentProducts.length && 
        <>
        <label htmlFor="nameFilter">Filter items</label>
        <br /> 
        <input
          type="search"
          id="nameFilter"
          placeholder="Start typing here..."
          value={nameFilter}
          onChange={handleInput}
        /></>}
      </form>
      <br />
      {error && <p aria-live="assertive">Error: {JSON.stringify(error)}</p>}
      {loading && <p aria-live="polite">List: Loading...</p>}
      {!loading && values.empty && <EmptyList />}
      {!loading && !values.empty && productsFiltered.length === 0 ? (
        <p aria-live="assertive">Not found products by name: '{nameFilter}'</p>
      ) : (
        <ProductList products={productsFiltered} />
      )}
    </div>
  );
}
export default ListView;
