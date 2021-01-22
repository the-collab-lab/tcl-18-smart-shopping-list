// eslint-disable-next-line no-extend-native
export function normalizeItem(String) {
  return String.trim()
    .toLowerCase()
    .match(/[^_\W]+/g)
    .join('');
};
