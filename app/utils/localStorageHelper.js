import Immutable from 'immutable';

/**
 * Prepare a fallback func in case Web Storage API is not available.
**/
const fallbackStorage = {
  getItem: () => undefined,
  setItem: () => undefined,
  removeItem: () => undefined,
  clear: () => undefined,
};

/**
 * This function checks availability of storage for the specific type.
 * @param type
 *   type of the storage
 * @return storage
 *   the desired storage object, or a fallbackStorage object.
**/
function getStorage(type) {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return storage;
  } catch (e) {
    return fallbackStorage;
  }
}

const localStorage = getStorage('localStorage');


const immutableLocalStorage = {
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value.toJS())),
  getItem: (key) => Immutable.fromJS(JSON.parse(localStorage.getItem(key))),
  removeItem: (key) => localStorage.removeItem(key),
};

const booleanItemStorage = {
  setItem: (key, value) => localStorage.setItem(key, value ? '1' : '0'),
  getItem: (key) => localStorage.getItem(key) === '1',
  removeItem: (key) => localStorage.removeItem(key),
};

export { immutableLocalStorage, booleanItemStorage };
