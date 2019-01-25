
const IS_DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  environment: 'dev',
  siteName: '小强哥',
  timeout: 30000, //接口超时时间
  serverIp: IS_DEV ? 'http://localhost:1839' : 'http://119.27.163.168:1839'
}
