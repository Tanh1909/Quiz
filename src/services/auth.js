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
export { register, login, logout };
