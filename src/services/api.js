// src/services/api.js
import axios from "axios";

export const backendUrl = "http://localhost:3000"; // export base URL backend

const API = axios.create({
  baseURL: `${backendUrl}/api`, // semua request ke /api otomatis
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

export const loginUser = (data) => {
  return API.post("/login", data);
};

export const registerUser = (data) => {
  return API.post("/register", data);
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getProfile = () => {
  return API.get("/profile");
};

export const addPackage = (data) => {
  return API.post("/packages/create", data);
};

export const getPackages = () => {
    return API.get("/packages");
};

export const updatePackage = (id, data) => {
    return API.put(`/packages/update/${id}`, data);
};

export const deletePackage = (id) => {
    return API.delete(`/packages/${id}`);
}


export default API;
