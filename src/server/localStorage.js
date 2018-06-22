/**
 * set storage
 * @param key
 * @param value
 */
export function setStorage (key, value) {
  if (!window.localStorage) {
    throw new Error('该浏览器不支持localStorage')
  } else {
    if (typeof value === 'object') {
      window.localStorage.setItem(key, window.JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, value)
    }
  }
}
/**
 * get storage
 * @param key
 */
export function getStorage (key) {
  if (!window.localStorage) {
    throw new Error('该浏览器不支持localStorage')
  } else {
    return window.localStorage.getItem(key)
  }
}
/**
 * remove by key
 * @param key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

// clear all storage
export function clearAll () {
  window.localStorage.clear()
}
