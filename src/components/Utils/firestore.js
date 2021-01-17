import { db } from 'lib/firebase';

//Create a product in the dataBase
export const addProduct = (objectProduct) => {
  const token = localStorage.getItem('tcl18-token');
  db.collection(token).doc().set(objectProduct);
};

export const getProducts = () => {
  const token = localStorage.getItem('tcl18-token');
  return db.collection(token);
};
