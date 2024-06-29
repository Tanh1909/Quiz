import { Flex } from "antd";
import CustomCard from "../../components/CustomCard";
import FormQuestion from "../../components/FormQuestion";
import { useEffect, useState } from "react";
import { getTopicById } from "../../services/topic";
import { useNavigate, useParams } from "react-router-dom";
function TopicDetail() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopicById(id);
        setTopic(response.data);
      } catch (e) {
        navigate("/not-found");
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Flex className="TopicDetail" vertical gap={20}>
        <CustomCard topic={topic} />
        <FormQuestion questions={topic.questions} id={topic.id} />
      </Flex>
    </>
  );
}

export default TopicDetail;
