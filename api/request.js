import axios from 'axios'

function checkStatus(response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: ''
    }
  }
}

function checkCode(res) {
  return res
}

/**
 * 公共请求类
 * withCredentials: 接口是否需要携带用户凭证cookie等信息
 * timeout: 30000 超时时间
 */
export default {
  post(url, param) {
    return axios({
      method: 'post',
      url: url,
      data: param,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;'
      }
    }).then(checkStatus).then(checkCode)
  },
  get(url, params) {
    return axios({
      method: 'get',
      url: url,
      params,
      timeout: 2000,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
      }
    }).then(checkStatus).then(checkCode)
  }
}
