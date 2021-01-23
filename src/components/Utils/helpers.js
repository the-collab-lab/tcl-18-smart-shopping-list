export function normalizeItem(String) {
  return String.trim()
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
