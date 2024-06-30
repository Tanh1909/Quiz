import { Button, Flex, Form, Input, Space, Statistic, message } from "antd";
import { useEffect, useRef, useState } from "react";
import NewPassword from "../NewPassword";
import { confirmOTP } from "../../../services/auth";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../redux/actions";
const { Countdown } = Statistic;
function ConfirmOTP({ setLogin, cancel, setConfirmOTP, email }) {
  const [newPassword, setNewPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const endTimeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!endTimeRef.current) {
      // Thiết lập giá trị endTime ban đầu chỉ khi component được mount lần đầu
      const initialEndTime = Date.now() + 5 * 60 * 1000; // 5 phút
      endTimeRef.current = initialEndTime;
      setEndTime(initialEndTime);
    } else {
      // Sử dụng giá trị endTime đã lưu trong ref
      setEndTime(endTimeRef.current);
    }
  }, []);
  const handleFinish = async ({ otp }) => {
    setLoad(true);
    const response = await confirmOTP({ email, otp });
    setLoad(false);
    if (response) {
      dispatch(loginAction(response.data.userResponse));
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setNewPassword(true);
    } else {
      messageApi.open({
        type: "error",
        content: "Sai mã OTP!",
      });
    }
  };
  const onDeadlineTime = () => {
    setConfirmOTP(false);
  };
  return (
    <>
      <>
        {contextHolder}
        {newPassword ? (
          <NewPassword
            setLogin={setLogin}
            cancel={cancel}
            setNewPassword={setNewPassword}
          />
        ) : (
          <Flex vertical justify="center" align="center" gap={10}>
            <h2 style={{ textAlign: "center" }}>Nhập mã OTP bạn nhận được</h2>
            <Countdown value={endTime} onFinish={onDeadlineTime} />
            <Form onFinish={handleFinish}>
              <Flex align="center" justify="center">
                <Form.Item
                  name={"otp"}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập đủ otp!",
                    },
                  ]}
                >
                  <Input.OTP />
                </Form.Item>
              </Flex>
              <Form.Item>
                <Button
                  loading={load}
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Hoàn thành
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        )}
      </>
    </>
  );
}

export default ConfirmOTP;
