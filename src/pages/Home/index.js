import { useEffect, useState } from "react";
import CustomCarousel from "../../components/CustomCarousel";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import MyResults from "../MyResults";
import { getAllCategories } from "../../services/category";
import MyTopics from "../Profile/MyTopics";
import Feedback from "../Feedback";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const categoriesResponse = await getAllCategories();
      setCategories(categoriesResponse.data.reverse());
    };
    fetchData();
  }, []);
  const handleClick = (id) => {
    navigate(`detail-topics/${id}`);
  };

  return (
    <>
      
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
                  onClick={() => navigate(`/more-topics?category=${item.name}`)}
                >
                  Xem thêm
                </Button>
              </Flex>
              <CustomCarousel topics={item.topics} navigate={handleClick} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
