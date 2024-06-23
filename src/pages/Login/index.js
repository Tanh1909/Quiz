import { Button, Modal, Space, notification } from "antd";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ show, login, cancel, setLogin }) {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const handleCancel = () => {
    cancel && cancel(false);
    navigate("/");
  };
  const logo =
    "data:image/jpeg;base64,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";
  return (
    <>
      {contextHolder}
      <Modal
        className="ModelLogin"
        open={show}
        onCancel={handleCancel}
        footer={null}
      >
        <Space className="Login" align="center" direction="vertical">
          <img
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: 4 }}
            className="logo"
            src={logo}
          />
          <h2>{login ? "Đăng nhập" : "Đăng ký"}</h2>
          {login ? (
            <LoginForm cancel={cancel} api={api} />
          ) : (
            <RegisterForm cancel={cancel} api={api} />
          )}
          <Space direction="vertical" className={!login ? "d-none" : ""}>
            <div>
              Bạn chưa có tài khoản?
              <a onClick={() => setLogin(false)}> Đăng ký</a>
            </div>
            <div>
              <a>Quên mật khẩu</a>
            </div>
          </Space>
        </Space>
      </Modal>
    </>
  );
}

export default Login;
