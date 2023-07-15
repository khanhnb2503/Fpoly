export const useLocalStorage = (key) => {
  // Get value local storage
  const getLocalStorage = () => {
    const local = localStorage.getItem(key)
    if (local != null) {
      return JSON.parse(local)
    }
    return null
  };

  // Set value local storage
  const setLocalStorage = (item) => {
    localStorage.setItem(key, JSON.stringify(item))
  };

  // Remote local storage
  const removeLocalStorage = () => {
    return localStorage.removeItem(key)
  };

  return [getLocalStorage, setLocalStorage, removeLocalStorage];
}