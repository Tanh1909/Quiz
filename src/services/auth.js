import axios from "../utils/fetchData";
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
    const data = response.data;
    localStorage.setItem("jwt", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.userResponse));
    return data;
  } catch (error) {
    return error.response.data;
  }
};
const logout = () => {
  localStorage.clear();
};
export { register, login, logout };
