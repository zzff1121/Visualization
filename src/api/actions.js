import request from '@/utils/request'
import qs from 'query-string'

// 请求映射规则
// GET、DELETE
// for/bar  url,[parmas]
// for/bar/:id  url,pathvar,[parmas]

// POST、PUT
// for/bar  url,[data]
// for/bar  url,params,[data]
// for/bar/:id  url,pathvar,[params],[data]
// for/bar/:id  url,pathvar,params,[data]

// post
export function postAction() {
  const args = Array.prototype.slice.call(arguments)
  const { url, data } = mapAllArgsToUrlAndData(args)
  return request({
    url: url,
    method: 'post',
    data
  })
}

// put
export function putAction() {
  const args = Array.prototype.slice.call(arguments)
  const { url, data } = mapAllArgsToUrlAndData(args)
  return request({
    url,
    method: 'put',
    data
  })
}

// get
export function getAction() {
  const url = mapAllArgsToUrl(Array.prototype.slice.call(arguments))
  return request({
    url,
    method: 'get'
  })
}

// deleteAction
export function deleteAction() {
  const url = mapAllArgsToUrl(Array.prototype.slice.call(arguments))
  return request({
    url,
    method: 'delete'
  })
}

/*
 * 将参数映射到路径变量
 * @param url
 * @param params 被映射到路径变量的参数
 * @return 将路径变量替换好的URL
 */
function mapParamsToPathVariables(url, params) {
  if (!url || typeof url !== 'string') {
    throw new Error(`url ${url} 应该是URL字符串`)
  }
  return url.replace(/:(\w+)/gi, (_, key) => params[key])
}

function mapAllArgsToUrl(args) {
  const url = args.splice(0, 1)[0]
  return mapArgsToUrl(url, args)
}

function mapAllArgsToUrlAndData(args) {
  let url = args.splice(0, 1)[0]
  if (url.indexOf('/:') !== -1) {
    const pathVariables = args.splice(0, 1)[0]
    if (!pathVariables) {
      throw new Error(`缺少参数为路径参数赋值`)
    }
    url = mapParamsToPathVariables(url, pathVariables)
  }
  if (args.length > 1) {
    const params = args.splice(0, 1)[0]
    if (url.indexOf('?') !== -1) {
      url = `${url}&${qs.stringify(params)}`
    } else {
      url = `${url}?${qs.stringify(params)}`
    }
  }
  const data = args[0]
  return {
    url,
    data
  }
}

function mapArgsToUrl(url, args) {
  // 路径参数
  if (url.indexOf('/:') !== -1) {
    const pathVariables = args.splice(0, 1)[0]
    if (!pathVariables) {
      throw new Error(`缺少参数为路径参数赋值`)
    }
    url = mapParamsToPathVariables(url, pathVariables)
  }
  if (args[0]) {
    if (url.indexOf('?') !== -1) {
      url = `${url}&${qs.stringify(args[0])}`
    } else {
      url = `${url}?${qs.stringify(args[0])}`
    }
  }
  return url
}
