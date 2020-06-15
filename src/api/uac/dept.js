import fetch from '@/utils/request'

const prefix = '/api/uac/dept'

export function getTree(params) {
  return fetch({
    url: `${prefix}/findDeptInfo`,
    method: 'get',
    params
  })
}

export function getDeptById(params) {
  return fetch({
    url: `${prefix}/getDeptById`,
    method: 'get',
    params
  })
}

export function deleteDict(data) {
  return fetch({
    url: `${prefix}/deleteDept`,
    method: 'post',
    data
  })
}

export function saveDept(data) {
  return fetch({
    url: `${prefix}/saveDept`,
    method: 'post',
    data
  })
}

export function updateDept(data) {
  return fetch({
    url: `${prefix}/updateDept`,
    method: 'post',
    data
  })
}
