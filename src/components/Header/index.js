import { Button, Dropdown, Flex, Space } from "antd";
import "./style.scss";
import Search from "antd/es/transfer/search";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomDropdown from "../CustomDropdown";
import CustomDrawer from "../CustomDrawer";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../pages/Login";
import { LOGIN, loginAction } from "../../redux/actions";
function Header() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    avatar:
      "data:image/jpeg;base64,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",
    username: "dtienanh",
    fullName: "Đỗ Tiến Anh",
  });
  const auth = useSelector((state) => state.authReducers);
  const dropdownStyle = {};
  return (
    <>
      <Flex align="center" justify="space-between" className="Header">
        <div className="drawer">
          <CustomDrawer user={user} auth={auth} />
        </div>
        <div className="search">
          <SearchOutlined style={{ fontSize: 20 }} />
        </div>
        <div className="left">
          <Space size={"middle"}>
            <img
              style={{
                objectFit: "cover",
                borderRadius: 8,
              }}
              width={38}
              height={38}
              src=""
            />
            <div>
              <strong>QUIZZ</strong>
            </div>
          </Space>
        </div>
        <div className="middle">
          <Search placeholder="nhập tên topic" allowClear />
        </div>
        {auth.isLogin ? (
          <Space size={"large"} align="center" className="right">
            <div className="history">Lịch sử bài làm</div>
            <div className="bell">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bell"
                class="svg-inline--fa fa-bell NavBar_action-icon__l9MxX"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"
                ></path>
              </svg>
            </div>
            <CustomDropdown user={user} />
          </Space>
        ) : (
          <Space size={"large"} align="center" className="right">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setLogin(true);
              }}
              type="text"
            >
              Đăng nhập
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setLogin(false);
              }}
              type="primary"
              ghost
            >
              Đăng ký
            </Button>
          </Space>
        )}
      </Flex>
      <Login
        show={isModalOpen}
        cancel={setIsModalOpen}
        login={login}
        setLogin={setLogin}
      />
    </>
  );
}

export default Header;
