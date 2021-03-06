import fetch from '@/utils/request'

export function page(query) {
  return fetch({
    url: '/api/uac/groupType/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/uac/groupType',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/uac/groupType/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/uac/groupType/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/uac/groupType/' + id,
    method: 'put',
    data: obj
  })
}
