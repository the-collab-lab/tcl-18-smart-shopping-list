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

export function differenceInDays(dateone,datetwo) {
  const difference = datetwo.getTime() - dateone.getTime()
  const days = Math.ceil(difference / (1000*3600*24))
  return days
}

//estimatedDaysNextPurchase, nextPurchase, numberOfPurchases
export function getProductStatus(product) {
  let status = ""
  if (!product.lastPurchasedDate) {
    switch (product.nextPurchase) {
      case 7:
          status = "soon"
        break;
      case 14: 
        status = "kind-soon"
        break;
      case 30:
        status = "not-soon"
        break;
        default: 
        status = ""
    }
    return status
  }

  if (product.estimatedDaysNextPurchase >= 0 && product.estimatedDaysNextPurchase < 7) {
    status = "soon"
  } else if (product.estimatedDaysNextPurchase >= 7 && product.estimatedDaysNextPurchase <= 30) {
    status = "kind-soon"
  } else if (product.estimatedDaysNextPurchase > 30) {
    status = "not-soon"
  } else if (
      product.numberOfPurchases === 1 ||
      (product.numberOfPurchases > 1 && product.estimatedDaysNextPurchase > 2*product.nextPurchase)
    ) {
    status = "inactive"
  } 
  return status;
}