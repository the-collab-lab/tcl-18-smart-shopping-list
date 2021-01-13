function checkTokenLocalStorage() {
  // Get from LocalStorage
  const tokenValue = localStorage.getItem('Token');

  if (tokenValue !== null && tokenValue !== undefined) {
    return true;
  }
  return false;
}

export { checkTokenLocalStorage };
