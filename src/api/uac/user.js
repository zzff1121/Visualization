import fetch from '@/utils/request'

export function page(query) {
  return fetch({
    url: '/api/uac/user/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/uac/user',
    method: 'post',
    data: obj
  })
}

export function resetPassword(data) {
  return fetch({
    url: '/api/uac/user/resetPassword',
    method: 'post',
    data
  })
}

export function changePassword(data) {
  return fetch({
    url: '/api/uac/user/updatePassword',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/uac/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/uac/user/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/uac/user/updateDetail',
    method: 'post',
    data: obj
  })
}

export function fetchTree() {
  return fetch({
    url: '/api/uac/dept/findDeptInfo',
    method: 'get'
  })
}

export function getDeparts(id) {
  return fetch({
    url: '/api/uac/dept/getDeptByUserId?userId=' + id,
    method: 'get'
  })
}
