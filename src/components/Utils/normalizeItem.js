String.prototype.normalizeItem = function () {
  return this.trim()
    .toLowerCase()
    .match(/[^_\W]+/g)
    .join('');
};
