import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
function CustomSpin() {
  return (
    <>
      <Flex
        style={{
          width: "100%",
          height: "100%",
        }}
        justify="center"
        align="center"
      >
        <Spin
          style={{ fontSize: 48 }}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      </Flex>
    </>
  );
}

export default CustomSpin;
