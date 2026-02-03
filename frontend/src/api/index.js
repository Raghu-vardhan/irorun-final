import axios from "axios";

const API = axios.create({
  baseURL: "https://irorun-final-1.onrender.com/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchDashboardData = () => API.get("api/dashboard");
export const loginUser = (data) => API.post("api/auth/login", data);

export default API;

