export function normalizeItem(item) {
  return item.trim()
    .toLowerCase()
    .match(/[^_\W]+/g)
    .join('');
}

export const productExists = (products, item) => {
  const normalizedItemInput = normalizeItem(item);

  const normalizedItemsDb = products.docs.map((doc) =>
    normalizeItem(doc.data().item),
  );
  return normalizedItemsDb.includes(normalizedItemInput);
};
