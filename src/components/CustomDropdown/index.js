import { BellOutlined } from "@ant-design/icons";
import { Dropdown, Flex } from "antd";
import style from "./style.module.scss";
import clxs from "clsx";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/auth";
function CustomDropdown({ user }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
  };
  const items = [
    {
      label: "Trang cá nhân",
      key: "0",
    },
    {
      label: "Các Quizz đã tạo",
      key: "1",
    },
    {
      label: <div onClick={handleLogout}>Đăng xuất</div>,
      key: "3",
    },
  ];
  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        dropdownRender={(menus) => {
          const arr = menus.props.items;
          const length = arr.length - 1;
          return (
            <>
              <div className={clxs(style.CustomDropdown)}>
                <Flex
                  align="center"
                  style={{
                    paddingBottom: 10,
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      marginRight: 10,
                    }}
                    width={51}
                    height={51}
                    src={user.avatar}
                  />
                  <Flex vertical size={"small"}>
                    <div className={clxs(style.fullname)}>{user.fullName}</div>
                    <div className={style.username}>{"@" + user.username}</div>
                  </Flex>
                </Flex>
                <hr />
                {arr.map((item, index) => {
                  return <div className={clxs(style.item)}>{item.label}</div>;
                })}
              </div>
            </>
          );
        }}
      >
        <img src={user.avatar} />
      </Dropdown>
    </>
  );
}

export default CustomDropdown;
