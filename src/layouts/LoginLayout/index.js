import { Outlet } from "react-router-dom";
import "./style.scss";
import { Modal } from "antd";
function LoginLayout() {
  return (
    <>
      <Modal className="ModelLogin" open={true} footer={null}>
        login
        <Outlet />
      </Modal>
    </>
  );
}

export default LoginLayout;
