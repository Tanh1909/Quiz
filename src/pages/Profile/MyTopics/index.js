import { Card, Empty, Space } from "antd";
import { useEffect, useState } from "react";
import { getTopicByUser } from "../../../services/topic";
import CustomCard from "../../../components/CustomCard";
import { useNavigate } from "react-router-dom";

function MyTopics({ setCountTopic, username }) {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const topicsReponse = await getTopicByUser(username);
      setTopics(topicsReponse?.data?.reverse());
      setCountTopic && setCountTopic(topicsReponse?.data?.length);
    };
    fetchApi();
  }, []);
  const handleClick = (id) => {
    navigate(`/detail-topics/${id}`);
  };

  return (
    <>
      <Card className="right" title="Quizz của bạn">
        <Space direction="vertical" style={{ width: "100%" }} size={"middle"}>
          {topics?.length > 0 ? (
            topics.map((item, index) => (
              <CustomCard
                onClick={() => handleClick(item.id)}
                topic={item}
                user={{ fullName: "fda" }}
                action
              />
            ))
          ) : (
            <Empty />
          )}
        </Space>
      </Card>
    </>
  );
}

export default MyTopics;
