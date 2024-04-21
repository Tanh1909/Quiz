import { get } from "../utils/request";

const getAllTopic = async () => {
  const response = await get("/topics");
  return response;
};
const getTopicById = async (id) => {
  const response = await get(`topics/${id}`);
  return response;
};

export { getAllTopic, getTopicById };
