import { axios, patch } from "../utils/fetchData";

const getCategoriesNonTopics = async () => {
  const response = await axios.get("/categories/nonTopics");
  return response.data;
};
const getAllCategories = async () => {
  const response = await axios.get("/categories");
  return response.data;
};
export { getCategoriesNonTopics, getAllCategories };
