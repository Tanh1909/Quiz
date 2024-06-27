import { Button, Modal, Space, notification } from "antd";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
function Login({ show, login, cancel, setLogin }) {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const handleCancel = () => {
    cancel && cancel(false);
    navigate("/");
  };

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
            width={50}
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
