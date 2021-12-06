const axios = require('axios')

// 基础配置
axios.defaults.baseURL = '';
axios.defaults.timeout = 30000; // 30s 超时
axios.defaults.withCredentials = true; // 允许跨域
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
axios.interceptors.request.use(config=> {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config;
}, err=> {
  console.log('******* http request failed', err)
})

// 响应拦截
axios.interceptors.response.use(res=> {
  return res.data;
}, err=> {
  console.log('******* http response failed', err)
})

module.exports = axios;