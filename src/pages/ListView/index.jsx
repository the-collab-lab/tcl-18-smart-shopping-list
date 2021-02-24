import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  getProducts,
  convertCollectionToArray,
} from 'components/Utils/firestore';
import { isSubstring } from 'components/Utils/helpers';
import ProductList from 'components/ProductList';
import EmptyList from 'components/EmptyList';
import Nav from 'components/Nav';
import '../ListView/styles.css';

function ListView() {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const query = getProducts();
  const [values, loading, error] = useCollection(query);
  const handleInput = (e) => setNameFilter(e.target.value);

  useEffect(() => {
    const collectionProducts = values ? values.docs : [];
    const arrayProducts = convertCollectionToArray(collectionProducts);
    if (!loading && nameFilter.length > 0) {
      setProductsFiltered(
        arrayProducts.filter((product) =>
          isSubstring(product.item, nameFilter),
        ),
      );
    } else {
      setProductsFiltered(arrayProducts);
    }
  }, [nameFilter, values, loading]);

  const currentProducts = values ? values.docs : [];

  return (
    <div className="list-view">
      {!!currentProducts.length && (
        <div className="products p-2">
          <form>
            <div className="form-group">
              <label htmlFor="nameFilter">Filter items</label>
              <br />
              <input
                className="form-control filter-container w-100"
                type="search"
                id="nameFilter"
                placeholder="Start typing here..."
                value={nameFilter}
                onChange={handleInput}
              />
            </div>
          </form>
          <br />
          {error && <p aria-live="assertive">Error: {JSON.stringify(error)}</p>}
          {loading && <p aria-live="polite">List: Loading...</p>}
          {!loading &&
            Array.isArray(productsFiltered) &&
            productsFiltered.length === 0 &&
            nameFilter.length > 0 && (
              <p aria-live="assertive">
                Not found products by name: '{nameFilter}'
              </p>
            )}
          {!loading &&
            Array.isArray(productsFiltered) &&
            productsFiltered.length > 0 && (
              <ProductList products={productsFiltered} />
            )}
        </div>
      )}
      {!loading && values.empty && <EmptyList />}

      {/* {(!loading && values.empty && nameFilter.length > 0) && <p aria-live="assertive">Not found products by name: '{nameFilter}'</p>}
      {(!loading && !values.empty && nameFilter.length > 0) && <ProductList products={productsFiltered} />}
      <p>loading: {loading}</p>
      <p>nameFilter: {nameFilter}</p>
      <p>values: {values.length}</p> */}

      {/* 
      {!loading && !values.empty && productsFiltered.length === 0 && nameFilter==="" ? (
        <p aria-live="assertive">Not found products by name: '{nameFilter}'</p>
      ) : (
        <>
          hola!
          <ProductList products={productsFiltered} />
        </>
      )} */}
      <Nav />
    </div>
  );
}
export default ListView;
