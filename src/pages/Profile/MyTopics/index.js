import { Card, Empty, Space } from "antd";
import { useEffect, useState } from "react";
import { getTopicByUser } from "../../../services/topic";
import CustomCard from "../../../components/CustomCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/actions";

function MyTopics({ setCountTopic, username }) {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      const topicsReponse = await getTopicByUser(username);
      console.log(topicsReponse);
      setTopics(topicsReponse?.data?.reverse());
      setCountTopic && setCountTopic(topicsReponse?.data?.length);
    };
    try {
      fetchApi();
    } catch (error) {
      dispatch(logoutAction());
    }
  }, []);

  return (
    <>
      <Card className="right" title="Quizz của bạn">
        <Space direction="vertical" style={{ width: "100%" }} size={"middle"}>
          {topics?.length > 0 ? (
            topics.map((item, index) => (
              <CustomCard
                setTopics={setTopics}
                topics={topics}
                topic={item}
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
