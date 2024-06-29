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
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth";
import { logoutAction } from "../../redux/actions/auth";

function CustomDrawer({ setIsModalOpen, setLogin, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const endpoint = window.location.href.split(process.env.REACT_APP_URL)[1];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
  };
  const navigateProfile = () => {
    navigate(`/profile`);
  };
  const navigateMyTopics = () => {
    navigate(`/my-topics`);
  };
  const navigateHome = () => {
    navigate(`/`);
  };

  const items = [
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Trang cá nhân",
    },
    {
      key: "/history",
      icon: <HistoryOutlined />,
      label: "Xem lại lịch sử làm bài",
    },
    {
      key: "/create-topic",
      icon: <PlusOutlined />,
      label: "Tạo Quizz",
    },
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/my-topics",
      icon: <DesktopOutlined />,
      label: "Các Quizz đã tạo",
    },
    {
      key: "/logout",
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
            onClick={({ key }) => {
              onClose();
              switch (key) {
                case "/profile": {
                  navigateProfile();
                  break;
                }
                case "/my-topics": {
                  navigateMyTopics();
                  break;
                }
                case "/create-topic": {
                  navigate("/create-topic");
                  break;
                }
                case "/history": {
                  navigate("/results");
                  break;
                }
                case "/logout": {
                  handleLogout();
                  break;
                }
                case "/": {
                  navigate("/");
                  break;
                }
                case "/login": {
                  setIsModalOpen(true);
                  setLogin(true);
                  break;
                }
                case "/register": {
                  setIsModalOpen(true);
                  setLogin(false);
                  break;
                }

                default:
                  break;
              }
            }}
            className="CustomDrawer"
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
