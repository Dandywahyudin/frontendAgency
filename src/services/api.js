// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// interceptor → kalau ada token, otomatis dikirim
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==== AUTH API ====

// fungsi login
export const loginUser = (data) => {
  return API.post("/login", data);
};

// fungsi register
export const registerUser = (data) => {
  return API.post("/register", data);
};

// ambil profil user setelah login
export const getProfile = () => {
  return API.get("/profile");
};

export const addPackage = (data) => {
  return API.post("/packages/create", data); // Konsisten dengan fungsi lain
};

export const getPackages = () => {
    return API.get("/packages");
};

export const updatePackage = (id, data) => {
    return API.put(`/packages/${id}`, data);
};

export const deletePackage = (id) => {
    return API.delete(`/packages/${id}`);
}


export default API;
