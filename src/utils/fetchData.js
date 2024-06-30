import axios from "axios";
import store from "../redux";
import { logoutAction } from "../redux/actions";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});
instance.interceptors.request.use(
  async (config) => {
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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config; // Lưu lại yêu cầu gốc

    // Kiểm tra lỗi 401 và đảm bảo rằng yêu cầu chưa được tái thực hiện
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu yêu cầu để không tái thực hiện nhiều lần

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Gửi yêu cầu làm mới token
          const response = await axios.post(
            process.env.REACT_APP_BASE_URL +
              "/auth/refresh?token=" +
              refreshToken
          );
          const newAccessToken = response.data.data.refreshToken;
          const user = response.data.data.userResponse;
          const jwt = response.data.data.token;
          // Lưu lại token mới
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("refreshToken", newAccessToken);

          // Cập nhật token trong header của yêu cầu gốc
          instance.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

          // Tái thực hiện yêu cầu gốc
          return instance(originalRequest);
        } catch (err) {
          // Xử lý khi refresh token không hợp lệ
          console.error("Refresh token expired or invalid");
          store.dispatch(logoutAction()); // Chuyển hướng đến trang đăng nhập
        }
      } else {
        store.dispatch(logoutAction());
        // Chuyển hướng đến trang đăng nhập nếu không có refresh token
      }
    }

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
