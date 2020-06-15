import fetch from '@/utils/request'

export function fetchTree(query) {
  return fetch({
    url: '/api/uac/menu/tree',
    method: 'get',
    params: query
  })
}

export function fetchAll() {
  return fetch({
    url: '/api/uac/menu/all',
    method: 'get'
  })
}
export function addObj(obj) {
  return fetch({
    url: '/api/uac/menu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/uac/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/uac/menu/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/uac/menu/' + id,
    method: 'put',
    data: obj
  })
}
