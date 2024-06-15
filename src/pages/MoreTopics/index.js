import { Card, Flex, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./style.scss";
import CustomCard from "../../components/CustomCard";
function MoreTopics() {
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
              TITLE HERE
            </strong>
          </Card>
        </Flex>
        <CustomCard hoverable />
      </Flex>
    </>
  );
}

export default MoreTopics;
