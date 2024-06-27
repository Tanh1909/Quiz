import { Flex, Form, Radio, Space, Tag, Progress, Avatar, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import Title from "antd/es/typography/Title";
import { findAnswerById } from "../../services/answer";
import { getTopicById } from "../../services/topic";
import defaultImage from "../../assets/images/defaultAvatar.png";
function Result() {
  const [date, setDate] = useState();
  const [countCorrect, SetCountCorrect] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    const getAnswers = async () => {
      const answer = await findAnswerById(id);
      console.log(answer);
      const question = answer.data.topic.questions;

      form.setFieldsValue({
        answers: answer.data.answers,
      });
      const formattedDate = new Date(answer.data.createdAt);
      const dateString = formattedDate.toLocaleDateString();
      const timeString = formattedDate.toLocaleTimeString();

      setDate(dateString + " - " + timeString);
      setUser(answer.data.user);
      setTitle(answer.data.topic.name);
      setQuestions(question);
      const arr = answer.data.answers.map((item, _) => {
        return item.answer;
      });
      setAnswers(arr);

      let count = 0;
      question?.map((element, index) => {
        if (element.correctAnswer == arr[index]) {
          count++;
        }
      });
      SetCountCorrect(count);
    };
    id && getAnswers();
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
              <Space direction="vertical">
                <Title level={5}>{date}</Title>
                <Title level={4}>
                  Đúng: {countCorrect} | Sai : {questions.length - countCorrect}{" "}
                  | Tổng số câu: {questions.length}
                </Title>
                <Space>
                  <p>Chủ sở hữu:</p>
                  <Tooltip placement="top" title={user.fullName}>
                    <Avatar src={user.avatar||defaultImage}/>
                  </Tooltip>
                </Space>
              </Space>

              <Progress
                type="circle"
                showInfo={true}
                percent={((countCorrect / questions.length) * 100).toFixed()}
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
                              {value.answer}
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
