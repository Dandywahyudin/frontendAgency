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
    return API.post(`/packages/update/${id}`, data);
};

export const deletePackage = (id) => {
    return API.delete(`/packages/${id}`);
}

export const getPackageById = (id) => {
    return API.get(`/packages/${id}`); 
};

export const submitPaymentProof = (formData) => {
  return API.post('/payment/submit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const checkOrderStatus = (packageId) => {
  return API.get(`/orders/status?packageId=${packageId}`);
};



export const getAllTasks = () => API.get('/tasks');

export const updateTaskStatus = (taskId, status) => {
  return API.patch(`/tasks/status/${taskId}`, { status });
};

export const createTask = (taskData) => {
  // tidak perlu menambahkan token manual, interceptor API sudah handle
  return API.post("/tasks", taskData);
};


export default API;
