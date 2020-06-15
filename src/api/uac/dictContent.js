import fetch from '@/utils/request'

const prefix = '/api/uac/dictionarycontent'

export function getList(params) {
  return fetch({
    url: `${prefix}/list`,
    method: 'get',
    params
  })
}

export function deleteDict(params) {
  return fetch({
    url: `${prefix}/delete`,
    method: 'delete',
    params
  })
}

export function saveDict(data) {
  return fetch({
    url: `${prefix}/save`,
    method: 'post',
    data
  })
}
