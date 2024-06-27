import CustomUpload from "../../CustomUpload";
import "./style.scss";
import { Button, Card, Flex, Space } from "antd";
function CardProfileHeader({ user, setUpdate, count }) {
  return (
    <>
      {user && (
        <Card className="CardProfile">
          <Flex justify="space-between">
            <Space align="start" size={"large"}>
              <CustomUpload user={user} />
              <Space direction="vertical" size={"small"}>
                <div>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#ea4335",
                    }}
                  >
                    {user.fullName}
                  </span>
                  <br />
                  <span>{"@" + user.username}</span>
                </div>
                <div>Tham gia vào ngày ...</div>
                <div>Sở hữu {count} quizz</div>
              </Space>
            </Space>
            {setUpdate && (
              <Button onClick={() => setUpdate(true)}>Chỉnh sửa hồ sơ</Button>
            )}
          </Flex>
        </Card>
      )}
    </>
  );
}

export default CardProfileHeader;
