import { axios } from "../utils/fetchData";

const getAllTopic = async () => {
  const response = await axios.get("topics");
  console.log(response);
  return response.data;
};
const getTopicById = async (id) => {
  const response = await axios.get(`/topics/${id}`);
  return response.data;
};
const getTopicByUser = async (username) => {
  const response = await axios.get(`/topics/user?username=${username}`);
  return response.data;
};
const createTopic = async (data) => {
  const response = await axios.post("/topics", data);
  return response.data;
};
const uploadImageTopic = async (id, image) => {
  const response = await axios.post(`/topics/${id}/image`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
const deleteTopicById = async (id) => {
  const response = await axios.delete(`/topics/${id}`);
  return response.data;
};
export {
  getAllTopic,
  getTopicById,
  getTopicByUser,
  createTopic,
  uploadImageTopic,
  deleteTopicById,
};
