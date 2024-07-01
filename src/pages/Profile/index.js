import { Card, Col, Empty, Flex, Row, Space, Spin } from "antd";
import CardProfileHeader from "../../components/CardProfile/Header";
import CardProfileBody from "../../components/CardProfile/Body";
import "./style.scss";
import { useEffect, useState } from "react";
import { getProfile, getUserById } from "../../services/user";

import MyTopics from "./MyTopics";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions";
import { LoadingOutlined } from "@ant-design/icons";
import CustomSpin from "../../components/CustomSpin";

function Profile() {
  const [user, setUser] = useState(null);
  const [countTopic, setCountTopic] = useState(0);
  const [loadingPage, setLoadingPage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoadingPage(true);
        const userResponse = await getProfile();
        setUser(userResponse?.data);
        setLoadingPage(false);
      } catch (error) {
        dispatch(logoutAction());
      }
    };
    fetchApi();
  }, []);

  const [update, setUpdate] = useState(false);
  return (
    <>
      {loadingPage ? (
        <CustomSpin />
      ) : (
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
                <MyTopics
                  setCountTopic={setCountTopic}
                  username={user.username}
                />
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default Profile;
