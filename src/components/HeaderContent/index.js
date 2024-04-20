import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import "./style.scss";
function HeaderContent() {
  return (
    <>
      <div className="header">
        <div className="left">Quizz</div>
        <div className="middle">
          <NavLink to="/">Home</NavLink>
          <NavLink to="topics">Topic</NavLink>
          <NavLink to="answers">Answers</NavLink>
        </div>
        <div className="right">
          <NavLink to="login">Login</NavLink>
        </div>
      </div>
    </>
  );
}

export default HeaderContent;
