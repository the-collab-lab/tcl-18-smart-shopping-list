export function normalizeItem(item) {
  return item
    .trim()
    .toLowerCase()
    .match(/[^_\W]+/g)
    .join('');
}

export const isProductDuplicated = (products, item) => {
  const normalizedItemInput = normalizeItem(item);

  const normalizedItemsDb = products.docs.map((doc) =>
    normalizeItem(doc.data().item),
  );
  return normalizedItemsDb.includes(normalizedItemInput);
};

export const isWithin24hours = (lastPurchasedDate) => {
  const currentDate = +new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  const isOutdated = currentDate - lastPurchasedDate > oneDay;
  return isOutdated;
};

export const latestInterval = (
  lastDateToMillis,
  numberOfPurchases,
  nextPurchaseEstimatedByUser,
) => {
  const currentDate = +new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  const dayInterval = Math.floor((currentDate - lastDateToMillis) / oneDay);
  const isFirstPurchase = numberOfPurchases === 1;
  return isFirstPurchase ? nextPurchaseEstimatedByUser : dayInterval;
};

export const isSubstring = (fullText = '', textToFind = '') => {
  return fullText.toLowerCase().includes(textToFind.toLowerCase());
};

export function differenceInDays(dateOne, dateTwo) {
  const difference = dateOne.getTime() - dateTwo.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}

export const getDaysNextPurchase = (product) => {
  const havePurchases = product.numberOfPurchases > 0;

  const estimatedDays = havePurchases
    ? product.estimatedDaysNextPurchase
    : product.nextPurchase;
  const lastPurchase = havePurchases
    ? product.lastPurchasedDate.toDate()
    : product.creationDate.toDate();

  const dateNextPurchase = new Date(lastPurchase);
  dateNextPurchase.setDate(lastPurchase.getDate() + estimatedDays);

  const today = new Date();
  const daysNextPurchase = differenceInDays(dateNextPurchase, today);

  return daysNextPurchase;
};

export const sortProducts = (p1, p2) => {
  let order = p1.daysNextPurchase - p2.daysNextPurchase;
  if (order === 0) order = p1.item > p2.item ? 1 : -1;

  return order;
};

export function getProductStatus(product) {
  let status = '';
  const { daysNextPurchase, estimatedDaysNextPurchase, nextPurchase } = product;
  const havePurchases = product.numberOfPurchases > 0;
  const estimatedDays = havePurchases
    ? estimatedDaysNextPurchase
    : nextPurchase;
  const lastPurchase = havePurchases
    ? product.lastPurchasedDate.toDate()
    : product.creationDate.toDate();
  const today = new Date();
  const lastPurchaseDays = differenceInDays(today, lastPurchase);

  if (lastPurchaseDays >= 2 * estimatedDays) status = 'inactive';
  else if (daysNextPurchase < 7) status = 'soon';
  else if (daysNextPurchase >= 7 && daysNextPurchase <= 30)
    status = 'kind-soon';
  else if (daysNextPurchase > 30) status = 'not-soon';

  return status;
}
