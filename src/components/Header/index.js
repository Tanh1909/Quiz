import { Button, Dropdown, Flex, Space } from "antd";
import "./style.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomDropdown from "../CustomDropdown";
import CustomDrawer from "../CustomDrawer";
import { useSelector } from "react-redux";
import Login from "../../pages/Login";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SearchInput from "./SearchInput";
import Search from "antd/es/transfer/search";
function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const selector = useSelector((state) => state.authReducers);
  const user = selector.user;
  const isLogin = localStorage.getItem("jwt") ? true : false;
  return (
    <>
      <Flex align="center" justify="space-between" className="Header">
        <div className="drawer">
          <CustomDrawer
            setIsModalOpen={setIsModalOpen}
            setLogin={setLogin}
            user={user}
            auth={isLogin}
          />
        </div>
        <div className="search">
          <SearchOutlined style={{ fontSize: 20 }} />
        </div>
        <div className="left">
          <Link style={{ color: "black" }} to={"/"}>
            <Space size={"middle"}>
              <img
                style={{
                  objectFit: "cover",
                  borderRadius: 5,
                }}
                width={48}
                height={38}
                src={logo}
              />
              <div>
                <strong>QUIZZ</strong>
              </div>
            </Space>
          </Link>
        </div>
        <div className="middle">
          {/* <Search placeholder="nhập tên topic" allowClear /> */}
          <SearchInput />
        </div>
        {isLogin ? (
          <Space size={"large"} align="center" className="right">
            <div
              className="history"
              onClick={() => {
                navigate("/results");
              }}
            >
              Lịch sử bài làm
            </div>
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
