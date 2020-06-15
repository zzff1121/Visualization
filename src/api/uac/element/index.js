import fetch from '@/utils/request'

export function page(query) {
  return fetch({
    url: '/api/uac/element/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/uac/element',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/uac/element/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/uac/element/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/uac/element/' + id,
    method: 'put',
    data: obj
  })
}
