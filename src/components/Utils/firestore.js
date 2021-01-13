import { db } from 'lib/firebase';

//Create a product in the dataBase
export const addProduct = (objectProduct) => {
  // add firestone
  db.collection('products').doc().set(objectProduct);
};

export const getProductsByToken = (token) => {
  return db.collection('products').where('token', '==', token);
};
