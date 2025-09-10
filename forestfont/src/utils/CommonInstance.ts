// Ai专门
import axios from 'axios'

const CommonInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.101:5000',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})
export default CommonInstance
