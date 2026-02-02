import axios from "axios";

const API = axios.create({
  baseURL: "https://irorun-final-1.onrender.com/api"
});

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};
