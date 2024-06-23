import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { loginAction, logoutAction } from "../../../redux/actions";
import { useEffect } from "react";

function AuthRoute() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("jwt") && localStorage.getItem("user")) {
      dispatch(loginAction(JSON.parse(localStorage.getItem("user"))));
    } else {
      dispatch(logoutAction());
    }
  }, []);
  return <Outlet />;
}

export default AuthRoute;
