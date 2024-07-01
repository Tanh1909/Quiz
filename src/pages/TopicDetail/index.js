import { Flex } from "antd";
import CustomCard from "../../components/CustomCard";
import FormQuestion from "../../components/FormQuestion";
import { useEffect, useState } from "react";
import { getTopicById } from "../../services/topic";
import { useNavigate, useParams } from "react-router-dom";
import CustomSpin from "../../components/CustomSpin";
function TopicDetail() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState({});
  const { id } = useParams();
  const [loadingPage, setLoadingPage] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoadingPage(true);
      try {
        const response = await getTopicById(id);
        setTopic(response.data);
      } catch (e) {
        navigate("/not-found");
      }
      setLoadingPage(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {loadingPage ? (
        <CustomSpin />
      ) : (
        <Flex className="TopicDetail" vertical gap={20}>
          <CustomCard topic={topic} />
          <FormQuestion questions={topic.questions} id={topic.id} />
        </Flex>
      )}
    </>
  );
}

export default TopicDetail;
