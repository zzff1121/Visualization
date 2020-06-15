import fetch from '@/utils/request'

export function login(data) {
  return fetch({
    url: '/api/auth/jwt/token',
    method: 'post',
    data
  })
}

export function changeOrg(params) {
  return fetch({
    url: '/api/auth/jwt/changeOrg',
    method: 'get',
    params
  })
}

export function logout(token) {
  return fetch({
    url: '/api/auth/jwt/invalid',
    method: 'get',
    params: { token }
  })
}

export function getInfo() {
  return fetch({
    url: '/api/uac/user/front/info',
    method: 'get'
  })
}

export function getMenus() {
  return fetch({
    url: '/api/uac/user/front/menus',
    method: 'get'
  })
}

export function getAllMenus() {
  return fetch({
    url: '/api/uac/user/front/menu/all',
    method: 'get'
  })
}
