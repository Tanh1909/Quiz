import { Button, Flex, Space, Table } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { getAllTopic } from "../../services/topic";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên chủ đề",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Actions",
    render: (_, data) => {
      return (
        <>
          <Space>
            <Link to={`/questions/${data.id}`}>
              <Button>Làm bài</Button>
            </Link>
            <Link to={`/play-mode/${data.id}`}>
              <Button icon={<PlayCircleOutlined />}>Play Quiz</Button>
            </Link>
          </Space>
        </>
      );
    },
  },
];
function Topic() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllTopic();
  
      if (response) {
        setData(response);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <Flex vertical gap={"middle"}>
        <Space direction="vertical">
          <h1>Danh sách các chủ đề</h1>
          <Link to={"/create-quetion"}>
            <Button size="large">Thêm đề tài</Button>
          </Link>
        </Space>
        <Table dataSource={data} columns={columns} />
      </Flex>
    </>
  );
}

export default Topic;
