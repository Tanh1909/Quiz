import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Radio,
  Space,
  notification,
} from "antd";
import "./style.scss";
import { patchUser } from "../../../services/user";
import { useState } from "react";
function CardProfileBody({ user, update, setUpdate, setUser }) {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = async (value) => {
    setLoading(true);
    const response = await patchUser(value);

    setLoading(false);
    if (response) {
      setUser(response.data);
      setUpdate(false);
    } else {
      form.setFields([{ name: "email", errors: ["email đã tồn tại"] }]);
    }
  };
  return (
    <>
      {user && (
        <>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  fontSize: 18,
                  colorTextDisabled: "#ea4335",
                },
                Radio: {
                  colorTextDisabled: "#ea4335",
                  fontSize: 16,
                },
              },
            }}
          >
            <Card className="CardProfileBody" title="Thông tin cá nhân">
              <Form
                form={form}
                initialValues={user}
                onFinish={handleSubmit}
                disabled={!update}
                className={!update ? "Form disable" : "Form"}
                layout={update ? "vertical" : "horizontal"}
                requiredMark={false}
              >
                <Form.Item
                  label={<h3>Họ tên</h3>}
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<h3>Email</h3>}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                    {
                      type: "email",
                      message: "Vui lòng nhập đúng định dạng!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<h3>Giới tính</h3>}
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giới tính",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={"Male"}>Nam</Radio>
                    <Radio value={"Female"}>Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item hidden={!update}>
                  <Flex justify="end">
                    <Space size={"middle"}>
                      <Button
                        style={{ width: 100 }}
                        onClick={() => setUpdate(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        loading={loading}
                        style={{ width: 100 }}
                        type="primary"
                        htmlType="submit"
                      >
                        Lưu
                      </Button>
                    </Space>
                  </Flex>
                </Form.Item>
              </Form>
            </Card>
          </ConfigProvider>
        </>
      )}
    </>
  );
}

export default CardProfileBody;
