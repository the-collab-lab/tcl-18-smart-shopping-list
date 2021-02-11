import { db } from 'lib/firebase';
import { getDaysNextPurchase } from './helpers';

//Create a product in the dataBase
export const addProduct = (objectProduct) => {
  const token = localStorage.getItem('tcl18-token');
  db.collection(token).doc().set(objectProduct);
};

export const getProducts = () => {
  const token = localStorage.getItem('tcl18-token');
  return db.collection(token);
};

export const existCollectionByToken = async (userToken) => {
  const collectionRefByToken = db.collection(userToken || ' ');
  try {
    const response = await collectionRefByToken.get();
    return !response.empty;
  } catch (e) {
    console.error(e);
  }
};

export const updateItemDate = (
  token,
  id,
  numberOfPurchases,
  estimatedDaysNextPurchase,
) => {
  return db.collection(token).doc(id).update({
    lastPurchasedDate: new Date(),
    numberOfPurchases: numberOfPurchases,
    estimatedDaysNextPurchase: estimatedDaysNextPurchase,
  });
};

export const convertCollectionToArray = (collection = []) => {
  return collection.map((document) => {
    const id = document.id;
    const daysNextPurchase = getDaysNextPurchase(document.data());
    return { id, ...document.data(), daysNextPurchase };
  });
};
