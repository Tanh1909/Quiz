import { Button, Flex, Form, Input, Space, message } from "antd";
import { LeftOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import ConfirmOTP from "../ConfirmOTP";
import { forgotPassword } from "../../../services/auth";
function ForgotPassword({ setLogin,cancel, setForgotPassword }) {
  const [confirmOTP, setConfirmOTP] = useState(false);
  const [load, setLoad] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const onFinish = async ({ email }) => {
    setLoad(true);
    const response = await forgotPassword(email);
    setLoad(false);
    if (response) {
      setEmail(email);
      setConfirmOTP(true);
    } else {
      messageApi.open({
        type: "error",
        content: "Email không tồn tại",
      });
    }
  };
  return (
    <>
      {contextHolder}
      {confirmOTP ? (
        <ConfirmOTP
        setLogin={setLogin}
          cancel={cancel}
          email={email}
          setConfirmOTP={setConfirmOTP}
        />
      ) : (
        <>
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>
            Quên mật khẩu
          </h2>
          <p style={{ marginBottom: 10 }}>
            Chúng tôi sẽ gửi OTP đến địa chỉ bạn cung cấp
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập your email!",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng!",
                },
              ]}
            >
              <Input size="large" prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item>
              <Button
                loading={load}
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
          <Button
            onClick={() => setForgotPassword(false)}
            type="text"
            icon={<LeftOutlined />}
          >
            Về Trang đăng nhập
          </Button>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
