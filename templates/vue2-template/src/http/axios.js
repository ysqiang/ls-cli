import axios  from 'axios'

axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.timeout = 3000;

axios.interceptors.request.use(config => {
  config.headers["Content-Type"] = 'application/json;charset=UTF-8';
  return config;
}, err => {
  console.log('*********** axios request failed. ', err)
})

axios.interceptors.response.use(response => {
  let {data, status, statusText} = response;
  console.log('*********** axios response ', response)
  if (status === 200) {
    return data;
  } else {
    return {data: '', status, statusText}
  }
}, err => {
  console.log('*********** axios response failed. ', err)
})



export default axios;