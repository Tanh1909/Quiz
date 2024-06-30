import { axios } from "../utils/fetchData";
const register = async ({ fullName, email, username, password }) => {
  try {
    const response = await axios.post("/auth/signup", {
      fullName,
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const login = async ({ username, password }) => {
  try {
    const response = await axios.post("/auth/login", {
      username,
      password,
    });

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data.userResponse)
    );
    localStorage.setItem("jwt", response.data.data.token);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    const data = response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};
const logout = () => {
  localStorage.clear();
};
const forgotPassword = async (email) => {
  try {
    const response = await axios.post("/auth/forgot-password?email=" + email);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const confirmOTP = async ({ email, otp }) => {
  try {
    const response = await axios.post(
      `/auth/confirm-otp?email=${email}&otp=${otp}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const changePassword = async (newPassword) => {
  try {
    const response = await axios.post(
      "/auth/change-password?newPassword=" + newPassword
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { register, login, logout, forgotPassword, confirmOTP, changePassword };
