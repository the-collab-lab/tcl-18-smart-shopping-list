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
