import axios from "axios"

import http from '@/http'
const getDemoData = () => {
  return http.get('/get/demo/data')
}

export {
  getDemoData
}