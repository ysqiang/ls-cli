const axiosInstance = require('./axios')

const HTTP = {
  get(url, config) {
    return axiosInstance.get(url, config)
  },
  post(url, data, config) {
    return axiosInstance.post(url, data, config)
  }
}

module.exports = HTTP;