import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import style from "./style.module.scss";

function DefaultLayout() {
  return (
    <>
      <div className={style.DefaultLayout}>
        <Header />
        <div className={style.Container}>
          <Sidebar />
          <div className={style.content}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
