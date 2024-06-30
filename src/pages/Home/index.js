import { useEffect, useState } from "react";
import CustomCarousel from "../../components/CustomCarousel";
import { Button, Flex, Skeleton, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import MyResults from "../MyResults";
import { getAllCategories } from "../../services/category";
import MyTopics from "../Profile/MyTopics";
import Feedback from "../Feedback";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoadingPage(true);
      const categoriesResponse = await getAllCategories();
      setCategories(categoriesResponse.data.reverse());
      setLoadingPage(false);
    };
    fetchData();
  }, []);
  const handleClick = (id) => {
    navigate(`detail-topics/${id}`);
  };

  return (
    <>
      {loadingPage ? (
        <>
          <Space direction="vertical">
            {[1, 2, 3].map(() => {
              return (
                <>
                  <Skeleton.Input active />
                  <Space size={"large"}>
                    {[1, 2, 3, 4, 5].map(() => (
                      <Skeleton.Image
                        active
                        style={{
                          width: 300,
                          height: 200,
                        }}
                      />
                    ))}
                  </Space>
                </>
              );
            })}
          </Space>
        </>
      ) : (
        <div className="Home">
          {categories.map((item, index) => {
            return (
              <div className="homeItem">
                <Flex
                  style={{ padding: "0 20px" }}
                  justify="space-between"
                  align="center"
                >
                  <strong>{item.name}</strong>
                  <Button
                    onClick={() =>
                      navigate(`/more-topics?category=${item.name}`)
                    }
                  >
                    Xem thêm
                  </Button>
                </Flex>
                <CustomCarousel topics={item.topics} navigate={handleClick} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Home;
