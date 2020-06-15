import store from '@/store'

export function hasPermission(perms) {
  const permissions = store.state.user.elements
  return permissions[perms]
}

export default {
  inserted(el, { value }) {
    console.log(value)
    for (const p of value.split(',')) {
      if (!hasPermission(p)) {
        el.parentNode.removeChild(el)
        return
      }
    }
  }
}
