import { combineReducers } from "redux";
import { SET_QUESTIONS } from "../actions";
import authReducers from "./auth";

//Question
const questionReducer = (state = [], action) => {
  switch (action.type) {
    case SET_QUESTIONS: {
      return action.payment;
    }
    default:
      return state;
  }
};
const rootReducer = combineReducers({ questionReducer, authReducers });
export { rootReducer };
