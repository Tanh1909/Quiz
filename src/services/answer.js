import { axios } from "../utils/fetchData";
const createAnswer = async (data) => {
  const response = await axios.post("/answers", data);
  return response.data;
};
const findAnswerById = async (id) => {
  const response = await axios.get(`/answers/${id}`);
  return response.data;
};
const findAnswerByUser = async (id) => {
  const response = await axios.get(`/answers/user/${id}`);
  return response.data;
};
const deleteAnswerById = async (id) => {
  const response = await axios.delete(`/answers/${id}`);
  return response.data;
};
export { createAnswer, findAnswerById, findAnswerByUser, deleteAnswerById };
