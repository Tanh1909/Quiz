import { Button, Card, Form, Input, Radio, Space } from "antd";
import { createAnswer } from "../../services/answer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { getQuestionByTopicId } from "../../services/question";
import { getTopicById } from "../../services/topic";
function Question() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    const fetchApi = async () => {
      const questions = await getQuestionByTopicId(id);
      const topics = await getTopicById(id);
      setTitle(topics && topics.name);
      setData(questions && questions);
    };
    fetchApi();
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const handleFinish = async (value) => {
    const response = await createAnswer({
      topicId: id,
      answers: value.answers,
    });
    navigate(`/result/${response.id}`);
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
