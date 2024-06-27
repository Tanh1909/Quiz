import { Avatar, Card, Empty, Flex, Space } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";
import Meta from "antd/es/card/Meta";
import defaultImage from "../../assets/images/defaultImageCard.webp";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { timeAgo } from "../../utils/DateUtils";
function CustomCarousel({ topics, navigate }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
      {topics?.length ? (
        <Carousel
          draggable={false}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
        >
          {topics.map((item, value) => {
            return (
              <Card
                onClick={() => navigate(item.id)}
                style={{
                  width: 240,
                }}
                hoverable
                cover={
                  <img
                    style={{
                      objectFit: "cover",
                    }}
                    alt="example"
                    width={300}
                    height={180}
                    src={item.image || defaultImage}
                  />
                }
              >
                <Meta
                  title={item.name}
                  description={
                    <Description
                      count={item.questions?.length}
                      time={item.createdAt}
                      user={item.user}
                    />
                  }
                />
              </Card>
            );
          })}
        </Carousel>
      ) : (
        <Flex style={{ width: "100%" }} align="center" justify="center">
          <Empty />
        </Flex>
      )}
    </>
  );
}

function Description({ count, time, user }) {
  return (
    <>
      <Space direction="vertical">
        <div>
          {count} câu hỏi - {timeAgo(time)}
        </div>
        <Space>
          <Avatar src={user.avatar || defaultAvatar} />
          <div>{user.fullName}</div>
        </Space>
      </Space>
    </>
  );
}

export default CustomCarousel;
