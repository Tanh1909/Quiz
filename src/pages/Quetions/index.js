import { Button, Card, Form, Input, Radio, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
function Question() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    const getQuestionById = async () => {
      const questions = await axios.get(
        `http://localhost:8080/questions?topicId=${id}`
      );
      const topics = await axios.get(`http://localhost:8080/topics/${id}`);
      setTitle(topics && topics.data.name);
      setData(questions && questions.data);
    };
    getQuestionById();
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const handleFinish = (value) => {
    const createAnswer = async () => {
      const response = await axios.post("http://localhost:8080/answers", {
        topicId: id,
        answers: value.answers,
      });
      navigate(`/result/${response.data.id}`);
    };
    createAnswer();
  };
  return (
    <>
      <div className="questions">
        <div className="container">
          <Card className="header">
            <h1>Chủ đề: {title} </h1>
          </Card>
          <Form
            scrollToFirstError="smooth"
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            {data.map((item, index) => {
              return (
                <>
                  <Form.Item
                    hidden
                    initialValue={item.id}
                    name={["answers", index, "questionId"]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    className="form__item"
                    label={<h2>{`Câu ${index + 1} : ${item.question}`}</h2>}
                    name={["answers", index, "answer"]}
                    rules={[
                      {
                        required: true,
                        message: "không được để trống!",
                      },
                    ]}
                  >
                    <Radio.Group className="radio">
                      <Space direction="vertical">
                        {item.answers.map((value, i) => {
                          return <Radio value={i}>{value}</Radio>;
                        })}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </>
              );
            })}
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
                <Button type="text" onClick={onReset}>
                  Xóa hết câu trả lời
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Question;
