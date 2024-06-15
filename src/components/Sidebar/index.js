import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const endpoint = window.location.href.split(process.env.REACT_APP_URL)[1];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const items = [
    {
      key: "/create-quetion",
      label: (
        <div className={style.createButton}>
          <PlusOutlined />
        </div>
      ),
    },
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "Option 2",
    },
    {
      key: "3",
      icon: <ContainerOutlined />,
      label: "Option 3",
    },
  ];
  return (
    <>
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
            navigate(key);
          }}
          className={style.Sidebar}
          defaultSelectedKeys={endpoint}
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </ConfigProvider>
    </>
  );
}

export default Sidebar;
