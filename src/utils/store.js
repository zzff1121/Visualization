export function setItem(key, value) {
  if (typeof value === 'undefined') {
    return
  }
  const v = JSON.stringify(value)
  window.localStorage[key] = v
}

export function getItem(key) {
  const value = window.localStorage[key]
  if (!value) {
    return null
  }
  return JSON.parse(value)
}
