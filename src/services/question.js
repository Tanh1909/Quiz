import { axios } from "../utils/fetchData";

const getQuestionByTopicId = async (id) => {
  try {
    const response = await axios.get(`/questions/topic/${id}`);
    return response.data;
  } catch (error) {}
};

export { getQuestionByTopicId };
