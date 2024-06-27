import { axios } from "../utils/fetchData";

const getQuestionByTopicId = async (id) => {
  const response = await axios.get(`/questions/topic/${id}`);
  return response.data;
};

export { getQuestionByTopicId };
