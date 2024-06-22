import { LOGIN, LOGOUT } from "../actions";

const authReducers = (state = {}, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("jwt");
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
