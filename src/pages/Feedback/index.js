import { Button, Flex, Form, Input, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createFeedBack } from "../../services/feedback";

function Feedback() {
  const [api, contextHolder] = notification.useNotification();
  const onFinish = async (values) => {
    const feedbackResponse = await createFeedBack(values);
    api["success"]({
      message: "Góp ý thành công",
    });
  };
  return (
    <>
      {contextHolder}
      <Flex justify="center">
        <div>
          <h1>Góp ý</h1>
        </div>
      </Flex>
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: "100%", height: 40 }}
            type="primary"
            htmlType="submit"
          >
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Feedback;
