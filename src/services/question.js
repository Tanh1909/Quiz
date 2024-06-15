import axios from "axios";

const getQuestionByTopicId = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/questions?topicId=${id}`
  );
  return response.data;
};

export { getQuestionByTopicId };
