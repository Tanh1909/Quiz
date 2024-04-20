import { Col, Flex, Progress, Row, notification, Statistic } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import correctAnswerAudio from "../../assets/audios/correct-answer.mp3";
import wrongAnswerAudio from "../../assets/audios/button-sound.mp3";
const { Countdown } = Statistic;
function PlayMode() {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(questions[index]);
  const [answerObj, setAnswerObj] = useState([]);
  const [lock, setLock] = useState(false);
  const [time, setTime] = useState(10);
  const navigate = useNavigate();
  //notify
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      duration: 1,
      onClose: function () {
        handleNext();
      },
      closeIcon: false,
    });
  };
  useEffect(() => {
    const getQuestionById = async () => {
      const questions = await axios.get(
        `http://localhost:8080/questions?topicId=${id}`
      );
      setQuestions(questions.data);
      setQuestion(questions.data[index]);
    };
    getQuestionById();
  }, []);
  useEffect(() => {
    setLock(false);
    setQuestion(questions[index]);
    if (index == questions.length && index > 0) {
      const postQuestion = async () => {
        const response = await axios.post(`http://localhost:8080/answers`, {
          topicId: id,
          answers: answerObj,
        });
        navigate(`/result/${response.data.id}`);
      };
      postQuestion();
    }
  }, [index]);
  const handleClick = (questionId, answer) => {
    setAnswerObj([...answerObj, { questionId: question.id, answer: answer }]);
    if (answer == undefined) {
      openNotificationWithIcon("error", "Time out!");
      document.getElementById("wrongAudio").play();
      return;
    }
    if (!lock) {
      if (answer == question.correctAnswer) {
        document.getElementById("correctAudio").play();
        openNotificationWithIcon("success", "correct answer");
      } else {
        document.getElementById("wrongAudio").play();
        openNotificationWithIcon("error", "wrong answer");
      }
      setLock(true);
    }
  };
  const handleNext = () => {
    setIndex((pre) => pre + 1);
  };
  return (
    <>
      {contextHolder}
      <div>
        <audio id="correctAudio" src={correctAnswerAudio} />
        <audio id="wrongAudio" src={wrongAnswerAudio} />
      </div>
      {question && (
        <Flex className="playmode" vertical align="center">
          <Row className="header">
            <Col span={24} className="item">
              <p>
                {index + 1} of {questions.length}
              </p>
              <p>
                <Countdown
                  onFinish={handleClick}
                  value={Date.now() + time * 1000}
                />
              </p>
            </Col>
          </Row>

          <Row className="question">
            <Col span={24}>
              <p>{question.question} </p>
            </Col>
          </Row>
          <Row className="items" gutter={[40, 20]}>
            {question.answers.map((element, index) => {
              return (
                <>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <p
                      onClick={() => handleClick(question.id, index)}
                      className="item"
                    >
                      {element}
                    </p>
                  </Col>
                </>
              );
            })}
          </Row>
        </Flex>
      )}
    </>
  );
}

export default PlayMode;
