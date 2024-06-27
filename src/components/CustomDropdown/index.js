import { Dropdown, Flex } from "antd";
import style from "./style.module.scss";
import clxs from "clsx";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/auth";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useNavigate } from "react-router-dom";
function CustomDropdown({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
  };
  const navigateProfile = () => {
    navigate(`profile`);
  };

  const items = [
    {
      label: <div onClick={navigateProfile}>Trang cá nhân</div>,
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
                      objectFit: "cover",
                    }}
                    width={51}
                    height={51}
                    src={user.avatar || defaultAvatar}
                  />
                  <Flex vertical size={"small"}>
                    <div className={clxs(style.fullname)}>
                      {user.fullName || " "}
                    </div>
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
      </Dropdown>
    </>
  );
}

export default CustomDropdown;
