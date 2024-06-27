import { Button, Radio, Space, Drawer, ConfigProvider, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import {
  MenuOutlined,
  DesktopOutlined,
  HomeOutlined,
  PlusOutlined,
  HistoryOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./style.scss";

function CustomDrawer({ user }) {
  const [open, setOpen] = useState(false);
  const endpoint = window.location.href.split(process.env.REACT_APP_URL)[1];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const items = [
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Trang Cá Nhân",
    },
    {
      key: "/history",
      icon: <HistoryOutlined />,
      label: "Xem lại lịch sử làm bài",
    },
    {
      key: "/create-quetion",
      icon: <PlusOutlined />,
      label: "Tạo Quizz",
    },
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "Các Quizz đã tạo",
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];
  const privateItems = [
    {
      key: "/login",
      icon: <LoginOutlined />,
      label: "Đăng nhập",
    },
    {
      key: "/register",
      icon: <UserAddOutlined />,
      label: "Đăng ký",
    },
  ];
  return (
    <>
      <MenuOutlined style={{ fontSize: 20 }} onClick={() => setOpen(true)} />
      <Drawer
        width={"80%"}
        title={user && <TitleDrawer user={user} />}
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                colorPrimary: "black",
                itemHoverBg: "#F5F5F5",
                itemSelectedBg: "#E8EBED",
              },
            },
          }}
        >
          <Menu
            className="CustomDrawer"
            onClick={({ key }) => {
              navigate(key);
            }}
            defaultSelectedKeys={endpoint}
            theme="light"
            items={user ? items : privateItems}
          />
        </ConfigProvider>
      </Drawer>
    </>
  );
}

function TitleDrawer({ user }) {
  return (
    <>
      <Space
        style={{
          paddingLeft: 16,
        }}
        direction="vertical"
        size={"small"}
      >
        <img
          style={{
            borderRadius: "50%",
            marginRight: 10,
            objectFit: "cover",
          }}
          width={51}
          height={51}
          src={user.avatar || defaultAvatar}
        />
        <div>{user.fullName || " "}</div>
        <div style={{ fontSize: 14, color: "gray" }} className="username">
          {"@" + user.username}
        </div>
      </Space>
    </>
  );
}

export default CustomDrawer;
