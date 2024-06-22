//questions
import { loginAction, logoutAction, LOGIN, LOGOUT } from "./auth";

const SET_QUESTIONS = "SET_QUESTIONS";
const setQuestionsAction = (value) => {
  return {
    type: SET_QUESTIONS,
    payment: value,
  };
};
export {
  SET_QUESTIONS,
  setQuestionsAction,
  loginAction,
  logoutAction,
  LOGIN,
  LOGOUT,
};
