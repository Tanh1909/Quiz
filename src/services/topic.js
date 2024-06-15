import axios from "axios";
const url = process.env.REACT_APP_BASE_URL + "/topics";

const getAllTopic = async () => {
  console.log(url);
  const response = await axios.get(url);
  console.log(response);
  return response.data.data;
};
const getTopicById = async (id) => {};

export { getAllTopic, getTopicById };
