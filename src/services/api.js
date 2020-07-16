import axios from 'axios'
// http://localhost:3001/api
const api = axios.create({ baseURL: "https://uploadxample-backend.herokuapp.com/" })

export default api