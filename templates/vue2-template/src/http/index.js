import axios from './axios'

const HTTP_ADVANCED = {
  get (url, config) {
    return axios.get(url, config);
  },
  post (url, params, config) {
    return axios.post(url, params, config)
  }
}

export default HTTP_ADVANCED