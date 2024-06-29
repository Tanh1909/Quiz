import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../actions";
const authReducers = (
  state = {
    user: null,
    isLogin: false,
  },
  action
) => {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");

      return {
        ...state,
        isLogin: false,
        user: null,
      };
    }

    default:
      return state;
  }
};
export default authReducers;
