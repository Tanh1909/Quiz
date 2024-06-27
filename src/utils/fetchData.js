import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const patch = async (path, data) => {
  const response = await instance.patch(path, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export { instance as axios, patch };
