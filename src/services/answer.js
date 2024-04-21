import { get, post } from "../utils/request";

const createAnswer = async (data) => {
  const response = await post("/answers", data);
  return response;
};
const getAllAnswers = async () => {
  const response = await get("/answers");
  return response;
};
export { createAnswer, getAllAnswers };
