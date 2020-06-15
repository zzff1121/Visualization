import fetch from '@/utils/request'

export function page(query) {
  return fetch({
    url: '/api/uac/gateLog/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/uac/gateLog',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/uac/gateLog/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/uac/gateLog/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/uac/gateLog/' + id,
    method: 'put',
    data: obj
  })
}
