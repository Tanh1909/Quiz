import {
  Input,
  Card,
  Flex,
  Form,
  Radio,
  Space,
  Tag,
  theme,
  Progress,
  Typography,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Pie } from "@ant-design/plots";
import "./style.scss";
import Title from "antd/es/typography/Title";
function Result() {
  const [countCorrect, SetCountCorrect] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    const getAnswers = async () => {
      const answer = await axios.get(`http://localhost:8080/answers/${id}`);
      const question = await axios.get(
        `http://localhost:8080/questions?topicId=${answer.data.topicId}`
      );
      const topics = await axios.get(
        `http://localhost:8080/topics/${answer.data.topicId}`
      );
      form.setFieldsValue({
        answers: answer.data.answers,
      });
      setTitle(topics && topics.data.name);
      setQuestions(question.data);
      const arr = answer.data.answers.map((item, index) => {
        return item.answer;
      });
      setAnswers(arr);

      let count = 0;
      question.data.map((element, index) => {
        if (element.correctAnswer == arr[index]) {
          count++;
        }
      });
      SetCountCorrect(count);
    };
    getAnswers();
  }, []);
  return (
    <>
      <div className="result">
        <Flex gap={"small"} vertical className="container">
          <div className="header">
            <h1>Kết Quả Chủ đề: {title} </h1>

            <Flex
              style={{ width: "100%" }}
              align="center"
              justify="space-between"
              gap={"large"}
            >
              <Title level={4}>
                Đúng: {countCorrect} | Sai : {questions.length - countCorrect} |
                Tổng số câu: {questions.length}
              </Title>
              <Progress
                type="circle"
                showInfo={true}
                percent={(countCorrect / questions.length) * 100}
                strokeColor="#34A853"
                trailColor="#EA4335"
              ></Progress>
            </Flex>
          </div>
          <Form form={form} layout="vertical" disabled>
            {questions.map((item, index) => {
              return (
                <>
                  <Form.Item
                    className="form__item"
                    label={
                      <>
                        <Space>
                          <h2>{`Câu ${index + 1} : ${item.question}`}</h2>
                          {item.correctAnswer === +answers[index] ? (
                            <Tag className="tag" color="#34A853">
                              Đúng
                            </Tag>
                          ) : (
                            <Tag className="tag" color="#EA4335">
                              Sai
                            </Tag>
                          )}
                        </Space>
                      </>
                    }
                    name={["answers", index, "answer"]}
                  >
                    <Radio.Group className="radio">
                      <Space direction="vertical">
                        {item.answers.map((value, i) => {
                          return (
                            <Radio
                              className={
                                +answers[index] === i &&
                                +answers[index] !== item.correctAnswer
                                  ? "false"
                                  : +item.correctAnswer === i
                                  ? "true"
                                  : ""
                              }
                              value={i}
                            >
                              {value}
                            </Radio>
                          );
                        })}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </>
              );
            })}
          </Form>
        </Flex>
      </div>
    </>
  );
}

export default Result;
