const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const loginAction = (value) => {
  return {
    type: LOGIN,
    payload: value,
  };
};

const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
export { LOGIN, LOGOUT, loginAction, logoutAction };
