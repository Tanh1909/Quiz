import { Flex } from "antd";
import CustomCard from "../../components/CustomCard";
import FormQuestion from "../../components/FormQuestion";
import { useEffect, useState } from "react";
import { getTopicById } from "../../services/topic";
import { useParams } from "react-router-dom";
function TopicDetail() {
  const [topic, setTopic] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTopicById(id);
      setTopic(response.data);
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
