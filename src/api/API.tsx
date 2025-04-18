import axios from "axios";
import { message } from "antd";

const API = axios.create({
  baseURL: "https://s-libraries.uz/api/v1", 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      message.error("Sessiya muddati tugadi. Iltimos, qayta kiring.");
      setTimeout(() => {
        window.location.replace("/login"); 
      }, 500);
    }

    return Promise.reject(error);
  }
);

export default API;
