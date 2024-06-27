import { axios, patch } from "../utils/fetchData";

const getCategoriesNonTopics = async () => {
  const response = await axios.get("/categories/nonTopics");
  return response.data;
};
export { getCategoriesNonTopics };
