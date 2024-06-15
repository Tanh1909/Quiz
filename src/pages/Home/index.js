import { useEffect } from "react";
import CustomCarousel from "../../components/CustomCarousel";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <div className="Home">
        <div className="homeItem">
          <Flex
            style={{ padding: "0 20px" }}
            justify="space-between"
            align="center"
          >
            <strong>Toán học</strong>
            <Button onClick={() => navigate("/more-topics/1")}>Xem thêm</Button>
          </Flex>
          <CustomCarousel />
        </div>
      </div>
    </>
  );
}

export default Home;
