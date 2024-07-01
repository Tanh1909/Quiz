import { axios } from "../utils/fetchData";
const getAllTopic = async () => {
  try {
    const response = await axios.get("topics");
    console.log(response);
    return response.data;
  } catch (error) {}
};
const getTopicById = async (id) => {
  try {
    const response = await axios.get(`/topics/${id}`);
    return response.data;
  } catch (error) {}
};
const getTopicByUser = async (username) => {
  try {
    const response = await axios.get(`/topics/user?username=${username}`);
    return response.data;
  } catch (error) {}
};
const createTopic = async (data) => {
  try {
    const response = await axios.post("/topics", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const patchTopicById = async (id, data) => {
  try {
    const response = await axios.patch(`/topics${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const uploadImageTopic = async (id, image) => {
  try {
    const response = await axios.post(`/topics/${id}/image`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {}
};
const findTopicsByCategory = async ({ category, page, size }) => {
  try {
    const response = await axios.get(`/topics/category?category=${category}`);
    return response.data;
  } catch (error) {}
};
const findTopicsByName = async ({ name, page, size }) => {
  try {
    let url = `/topics/name?name=${name}`;
    if (page || page == 0) {
      url += `&page=${page}`;
    }
    if (size || size == 0) {
      url += `&size=${size}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {}
};
const deleteTopicById = async (id) => {
  try {
    const response = await axios.delete(`/topics/${id}`);
    return response.data;
  } catch (error) {}
};
export {
  getAllTopic,
  getTopicById,
  getTopicByUser,
  createTopic,
  uploadImageTopic,
  deleteTopicById,
  findTopicsByName,
  findTopicsByCategory,
  patchTopicById,
};
