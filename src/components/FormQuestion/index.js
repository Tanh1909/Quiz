import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Radio,
  Space,
  Affix,
  Typography,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function FormQuestion({ questions, id }) {
  const [form] = Form.useForm();

  const [showAnswer, setShowAnswer] = useState(false);
  const [exam, setExam] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const onFill = (value) => {
    form.setFieldsValue(value);
  };
  const handleShowAnswer = () => {
    if (!showAnswer) {
      let initialValue = {};
      for (let i = 0; i < questions.length; i++) {
        initialValue = {
          ...initialValue,
          [i]: {
            questionId: questions[i].id,
            answer: questions[i].correctAnswer,
          },
        };
      }

      onFill(initialValue);
    } else {
      onReset();
    }
    setShowAnswer(!showAnswer);
  };
  const handlePlayMode = () => {
    navigate(`/play-mode/${id}`);
  };
  const onExam = () => {
    setShowAnswer(false);
    onReset();
    setExam(true);
  };
  const offExam = () => {
    setExam(false);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              dotColorDisabled: "#34A853",
            },
            Button: {
              defaultHoverBorderColor: "#e8ebed",
              defaultHoverColor: "black",
              defaultActiveBorderColor: "#ea4335",
            },
          },
          token: {
            colorPrimary: "#ea4335",
          },
        }}
      >
        <div className="FormQuestion">
          <div className={exam ? "groupBtn d-none" : "groupBtn"}>
            <Flex align="center" justify="center" gap={20}>
              <Button onClick={handlePlayMode} className="btn primary">
                Play Mode
              </Button>
              <Button type="default" className="btn secondary" onClick={onExam}>
                Làm bài
              </Button>
            </Flex>
          </div>
          <Flex className="header" align="center" justify="space-between">
            {/* <Space>
            <OrderedListOutlined />
            <div>20 câu hỏi</div>
          </Space> */}
            <Button
              className={exam ? "d-none" : ""}
              icon={showAnswer ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={handleShowAnswer}
            >
              {showAnswer ? "Ẩn đáp án" : "Hiện đáp án"}
            </Button>
            <Button
              className={exam ? "d-block" : "d-none"}
              icon={<LeftOutlined />}
              onClick={offExam}
            >
              Quay lại
            </Button>
          </Flex>
          <Form
            disabled={!exam}
            name="questions"
            layout="vertical"
            className="Form"
            form={form}
            onFinish={onFinish}
          >
            {questions?.map((item, index) => (
              <Card key={"question" + index} className="card">
                <Form.Item
                  name={[index, "questionId"]}
                  initialValue={item.id}
                  hidden
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="item"
                  name={[index, "answer"]}
                  label={<Header title={item.question} />}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      {item.answers.map((subItem, subIndex) => (
                        <Radio value={subIndex} key={"answer" + subIndex}>
                          {subItem.answer}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>
            ))}

            <Form.Item hidden={!exam}>
              <Button className="btnSubmit" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ConfigProvider>
    </>
  );
}
function Header({ title }) {
  return (
    <>
      <Flex gap={10} align="center" justify="center">
        {/* <img
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 5,
          }}
          alt="img"
        /> */}
        <div>{title}</div>
      </Flex>
    </>
  );
}

export default FormQuestion;
