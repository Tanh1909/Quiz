import { Button, Card, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getAllAnswers } from "../../services/answer";

function Answers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const answers = await getAllAnswers();
      setData(answers.reverse());
    };
    fetchApi();
  }, []);
  return (
    <>
      <Space direction="vertical">
        {data.map((item, index) => {
          return (
            <>
              <Card>
                <Link to={`/result/${item.id}`}>Topic {item.id}</Link>
              </Card>
            </>
          );
        })}
      </Space>
    </>
  );
}

export default Answers;
