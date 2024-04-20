import { Button, Card, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Answers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAnswers = async () => {
      const answers = await axios.get("http://localhost:8080/answers");
      setData(answers.data.reverse());
    };
    getAnswers();
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
