import { Button, Form, Input, Typography, message } from "antd";
import { useState } from "react";
import { changePassword } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

function NewPassword({ setLogin, cancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleFinish = async ({ password }) => {
    setLoading(true);
    const response = await changePassword(password);
    console.log(response);
    setLoading(false);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Đổi mật khẩu thành công!",
      });
      cancel(false);
      setLogin(true);
    } else {
    }
  };
  return (
    <>
      {contextHolder}
      <h1 style={{ textAlign: "center", marginBottom: 10 }}>
        Cập nhật mật khẩu mới
      </h1>
      <Form onFinish={handleFinish} form={form} layout="vertical">
        <Form.Item
          label="Nhập mật khẩu mới"
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
          label="Nhập lại mật khẩu mới"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default NewPassword;
