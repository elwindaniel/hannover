import axios from "axios";

   let API_URL = "https://www.hannovermalayalis.de/api/"
    // let API_URL = "http://localhost:8083/api/"
let token = '';

if (typeof window !== 'undefined') {
  token = localStorage.getItem('authToken');
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
export default axiosInstance;
