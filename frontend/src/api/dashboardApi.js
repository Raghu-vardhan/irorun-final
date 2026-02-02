import axios from "axios";

const API = axios.create({
    baseURL: "https://irorun-final-1.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchDashboardData = () => {
  return API.get("/dashboard"); // ✅ EXACT
};
