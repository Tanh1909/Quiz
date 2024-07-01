import { axios, patch } from "../utils/fetchData";
import store from "../redux";
import { loginAction, logoutAction } from "../redux/actions";
const getProfile = async () => {
  try {
    const response = await axios.get(`/users`);
    return response.data;
  } catch (error) {
    store.dispatch(logoutAction());
  }
};

const patchUser = async ({ fullName, email, avatar, dateOfBirth, gender }) => {
  try {
    const data = { fullName, email, avatar, dateOfBirth, gender };
    const response = await patch(`users`, data);
    store.dispatch(loginAction(response.data));
    return response;
  } catch (error) {
    return null;
  }
};
export { patchUser, getProfile };
