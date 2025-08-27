// Ai专门
import axios from 'axios'

const CommonInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})
export default CommonInstance
