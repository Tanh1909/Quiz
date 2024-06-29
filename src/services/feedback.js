import { axios } from "../utils/fetchData";

const createFeedBack = async (value) => {
  try {
    const response = await axios.post("/feedbacks", value);
    return response.data;
  } catch (error) {}
};
export { createFeedBack };
