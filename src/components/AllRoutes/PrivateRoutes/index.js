import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { loginAction, logoutAction } from "../../../redux/actions";
import { useEffect } from "react";
import Login from "../../../pages/Login";

function PrivateRoute() {
  const isLogin = useSelector((state) => state.authReducers).isLogin;
  return <>{isLogin ? <Outlet /> : <Login show login />}</>;
}

export default PrivateRoute;
