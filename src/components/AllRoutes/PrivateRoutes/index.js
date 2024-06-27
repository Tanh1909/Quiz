import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { loginAction, logoutAction } from "../../../redux/actions";
import { useEffect, useState } from "react";
import Login from "../../../pages/Login";

function PrivateRoute() {
  const isLogin = useSelector((state) => state.authReducers).isLogin;
  const [login, setLogin] = useState(!isLogin);
  const [isModalOpen, setIsModalOpen] = useState(!isLogin);
  return (
    <>
      {isLogin ? (
        <Outlet />
      ) : (
        <Login show cancel={setIsModalOpen} login={login} setLogin={setLogin} />
      )}
    </>
  );
}

export default PrivateRoute;
