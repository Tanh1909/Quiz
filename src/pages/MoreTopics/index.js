import { Card, Empty, Flex, Space } from "antd";
import "./style.scss";
import CustomCard from "../../components/CustomCard";
import { useEffect, useState } from "react";
import { findTopicsByCategory } from "../../services/topic";
import { useLocation } from "react-router-dom";
function MoreTopics() {
  const [topics, setTopics] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const page = queryParams.get("page");
  const size = queryParams.get("size");

  useEffect(() => {
    const fetchData = async () => {
      const topicResponse = await findTopicsByCategory({
        category,
        page,
        size,
      });
      setTopics(topicResponse.data.reverse());
    };
    fetchData();
  }, []);
  return (
    <>
      <Flex vertical className="MoreTopics" gap={20}>
        <Flex className="item">
          <Card className="card header">
            <strong
              style={{
                fontSize: 20,
              }}
            >
              {category}
            </strong>
          </Card>
        </Flex>
        {topics?.length > 0 ? (
          topics.map((item, index) => <CustomCard hoverable topic={item} />)
        ) : (
          <Empty />
        )}
      </Flex>
    </>
  );
}

export default MoreTopics;
