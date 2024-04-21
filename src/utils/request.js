import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
});

const get = async (path, config) => {
  const response = await instance.get(path, config);
  return response.data;
};

const post = async (path, data) => {
  const response = await instance.post(path, data);
  return response.data;
};

export { get, post };
