import { db } from 'lib/firebase';

export const addProduct = (objectProduct) => {
  // add firestone
  db.collection('products').doc().set(objectProduct);
};
