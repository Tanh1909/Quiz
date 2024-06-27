import { Popconfirm, Progress, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { findAnswerByUser } from "../../services/answer";
import { timeAgo } from "../../utils/DateUtils";
import { useNavigate } from "react-router-dom";

function MyResults() {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await findAnswerByUser(user.id);
      const topics = response.data;

      const data = topics?.map((item, index) => {
        const total = item.topic.questions?.length;
        let count = countCorrect(item.topic.questions, item.answers);
        const percent = ((count / total) * 100).toFixed();
        return {
          key: item.id,
          category: item.topic.category,
          topic: item.topic.name,
          count: percent,
          time: timeAgo(item.createdAt),
        };
      });
      setDataSource(data);
    };
    fetchData();
    const countCorrect = (questions, answers) => {
      let count = 0;
      questions?.map((item, index) => {
        if (
          item.id == answers[index].questionId &&
          item.correctAnswer == answers[index].answer
        ) {
          count++;
        }
      });
      return count;
    };
  }, []);
  const columns = [
    {
      title: "Chủ đề",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Tên Quizz",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Câu đúng",
      dataIndex: "count",
      key: "count",
      render: (_, record) => {
        return (
          <Progress
            size={"small"}
            showInfo={true}
            percent={record.count}
            strokeColor="#34A853"
            trailColor="#EA4335"
            type="circle"
          />
        );
      },
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              navigate(`/result/${record.key}`);
            }}
          >
            Xem chi tiết
          </a>
          <HandleDelete />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}
function HandleDelete() {
  //start delete handle
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //end delete handle
  return (
    <>
      <Popconfirm
        icon={null}
        title="Xoá"
        description="Bạn có chắc muốn xóa chứ"
        okText="Xác nhận"
        cancelText="Hủy"
        cancelButtonProps={{
          disabled: confirmLoading,
        }}
        open={open}
        onConfirm={handleDelete}
        okButtonProps={{
          loading: confirmLoading,
        }}
        onCancel={handleCancel}
      >
        <p
          onClick={() => setOpen(true)}
          style={{ color: "red", cursor: "pointer" }}
        >
          Xóa
        </p>
      </Popconfirm>
    </>
  );
}
export default MyResults;
