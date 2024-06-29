import { Card, Col, Empty, Row, Space } from "antd";
import CardProfileHeader from "../../components/CardProfile/Header";
import CardProfileBody from "../../components/CardProfile/Body";
import "./style.scss";
import { useEffect, useState } from "react";
import { getProfile, getUserById } from "../../services/user";

import MyTopics from "./MyTopics";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions";

function Profile() {
  const [user, setUser] = useState(null);
  const [countTopic, setCountTopic] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      const userResponse = await getProfile();
      setUser(userResponse?.data);
    };
    try {
      fetchApi();
    } catch (error) {
      dispatch(logoutAction());
    }
  }, []);

  const [update, setUpdate] = useState(false);
  return (
    <>
      <Row className="Profile" gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <CardProfileHeader
            user={user}
            setUpdate={setUpdate}
            count={countTopic}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="left">
            <CardProfileBody
              user={user}
              update={update}
              setUpdate={setUpdate}
              setUser={setUser}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {user && (
            <MyTopics setCountTopic={setCountTopic} username={user.username} />
          )}
        </Col>
      </Row>
    </>
  );
}

export default Profile;
