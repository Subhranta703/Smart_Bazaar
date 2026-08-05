import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://smart-bazaar.onrender.com/api"
    : "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;