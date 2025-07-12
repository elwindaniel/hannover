// utils/sessionStorageUtil.js

const isBrowser = typeof window !== 'undefined';

export const setSessionStorage = (key, value) => {
  if (isBrowser) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionStorage = (key) => {
  if (isBrowser) {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
};

export const removeSessionStorage = (key) => {
  if (isBrowser) {
    sessionStorage.removeItem(key);
  }
};


export const clearSessionStorage = () => {
    if (isBrowser) {
      sessionStorage.clear();
    }
  };