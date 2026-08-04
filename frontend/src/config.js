const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://smart-bazaar.onrender.com/api"
    : "http://localhost:8080/api";

export default BASE_URL;
