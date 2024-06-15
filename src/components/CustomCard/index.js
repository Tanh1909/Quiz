import { Card, Flex, Space } from "antd";
import { MenuOutlined, OrderedListOutlined } from "@ant-design/icons";
import { timeAgo } from "../../utils/DateUtils";
import "./style.scss";
function CustomCard({ hoverable, data }) {
  const { user, questions } = data;
  return (
    <>
      <Flex className="CustomCard">
        <Card hoverable={hoverable} className="card">
          <Flex gap={20}>
            <img className="img" src={data.image} />
            <Flex
              style={{ height: "100%" }}
              vertical
              gap={10}
              align="start"
              justify="center"
            >
              <h3>{data.name}</h3>
              <Space>
                <OrderedListOutlined />
                <div>{questions.length + " Câu hỏi"}</div>
              </Space>
              <Flex align="center" gap={10}>
                <img className="avatar" src={user.avatar} alt="avatar" />
                <div>{user.fullName}</div>
                <div>{timeAgo(data.createdDate)}</div>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

export default CustomCard;
