function checkTokenLocalStorage() {
  // Get from LocalStorage
  return !!localStorage.getItem('Token');

}

export { checkTokenLocalStorage };
