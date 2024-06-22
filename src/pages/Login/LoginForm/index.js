import { Button, Flex, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function LoginForm() {
  return (
    <>
      <Form className="form" layout="vertical" requiredMark={false}>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tài khoản",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
