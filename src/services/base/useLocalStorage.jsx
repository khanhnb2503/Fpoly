export const getLocalStorage = (key) => {
  const local = localStorage.getItem(key);
  if (local != null) {
    return JSON.parse(local);
  }
  return null
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
}
