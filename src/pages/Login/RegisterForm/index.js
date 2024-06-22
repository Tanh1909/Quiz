import { Button, Flex, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function RegisterForm() {
  return (
    <>
      <Form className="form" layout="vertical" requiredMark={false}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Họ tên",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item
          label="Nhập lại mật khẩu"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Đăng Ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default RegisterForm;
