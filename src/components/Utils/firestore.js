import { db } from 'lib/firebase';
import {normalizeItem} from 'components/Utils/helpers';

//Create a product in the dataBase
export const addProduct = (objectProduct) => {
  const token = localStorage.getItem('tcl18-token');
  db.collection(token).doc().set(objectProduct);
};

export const getProducts = () => {
  const token = localStorage.getItem('tcl18-token');
  return db.collection(token);
};

export const productExists = (products, normalizedItemInput) => {
  const normalizedItemsDb = products.docs.map((doc) =>
    normalizeItem(doc.data().item),
  );
  return normalizedItemsDb.includes(normalizedItemInput);
};
