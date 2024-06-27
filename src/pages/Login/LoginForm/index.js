import { Alert, Button, Flex, Form, Input, Space, notification } from "antd";
import { LockOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { login } from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/actions";
import { useState } from "react";
function LoginForm({ cancel, api }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (value) => {
    setLoading(true);
    const response = await login(value);
    setLoading(false);
    if (response.code == 200) {
      dispatch(loginAction(response.data.userResponse));
      cancel && cancel(false);
    } else {
      api["error"]({
        message: "Sai tài khoản hoặc mật khẩu",
        duration: 2,
      });
    }
  };
  return (
    <>
      <Form
        onFinish={handleSubmit}
        className="form"
        layout="vertical"
        requiredMark={false}
      >
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
          <Button
            loading={loading}
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
