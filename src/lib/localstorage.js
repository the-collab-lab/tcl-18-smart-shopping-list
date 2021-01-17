function checkTokenLocalStorage() {
  // Get from LocalStorage
  return !!localStorage.getItem('tcl18-token');
}

export { checkTokenLocalStorage };
