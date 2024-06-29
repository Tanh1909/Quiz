import { axios, patch } from "../utils/fetchData";

const getCategoriesNonTopics = async () => {
  try {
    const response = await axios.get("/categories/nonTopics");
    return response.data;
  } catch (error) {}
};
const getAllCategories = async () => {
  try {
    const response = await axios.get("/categories");
    return response.data;
  } catch (error) {}
};
export { getCategoriesNonTopics, getAllCategories };
