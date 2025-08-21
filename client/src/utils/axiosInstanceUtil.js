import axios from "axios";

const axiosInstanceUtil = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true
});

export default axiosInstanceUtil;