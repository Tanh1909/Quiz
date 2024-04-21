import { get } from "../utils/request";

const getQuestionByTopicId = async (id) => {
    const response = await get(`http://localhost:8080/questions?topicId=${id}`);
    return response;
};

export {getQuestionByTopicId}
