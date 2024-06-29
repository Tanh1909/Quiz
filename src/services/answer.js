import { axios } from "../utils/fetchData";
const createAnswer = async (data) => {
  try {
    const response = await axios.post("/answers", data);
    return response.data;
  } catch (error) {}
};
const findAnswerById = async (id) => {
  try {
    const response = await axios.get(`/answers/${id}`);
    return response.data;
  } catch (error) {}
};
const findAnswerByUser = async (id) => {
  try {
    const response = await axios.get(`/answers/user/${id}`);
    return response.data;
  } catch (error) {}
};
const deleteAnswerById = async (id) => {
  try {
    const response = await axios.delete(`/answers/${id}`);
    return response.data;
  } catch (error) {}
};
export { createAnswer, findAnswerById, findAnswerByUser, deleteAnswerById };
