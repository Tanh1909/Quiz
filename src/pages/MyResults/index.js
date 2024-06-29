import { Popconfirm, Progress, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteAnswerById, findAnswerByUser } from "../../services/answer";
import { timeAgo } from "../../utils/DateUtils";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/actions";
import { useDispatch } from "react-redux";

function MyResults() {
  const [dataSource, setDataSource] = useState([]);
  const [category, setCategory] = useState();
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        dispatch(logoutAction());

        return;
      }
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
          time: item.createdAt,
        };
      });
      const categoryArr = [...new Set(data?.map((item, _) => item.category))];
      setCategory(
        categoryArr?.map((item, _) => {
          return {
            text: item,
            value: item,
          };
        })
      );
      setDataSource(data?.reverse());
    };
    try {
      console.log("fetch data");
      fetchData();
    } catch (error) {
      console.log(error);
      dispatch(logoutAction());
    }
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
  }, [refresh]);

  const columns = [
    {
      title: "Chủ đề",
      dataIndex: "category",
      key: "category",
      filters: category,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
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
      sorter: (a, b) => a.count - b.count,
      showSorterTooltip: false,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => {
        a = new Date(a.time).getTime();
        b = new Date(b.time).getTime();
        return a - b;
      },
      showSorterTooltip: false,
      render: (text, record, _) => {
        return timeAgo(text);
      },
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
          <HandleDelete id={record.key} setRefresh={setRefresh} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        pagination={{
          defaultPageSize: 5,
        }}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
}
function HandleDelete({ id, setRefresh }) {
  //start delete handle
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    setConfirmLoading(true);
    const fetchData = async () => {
      const response = await deleteAnswerById(id);
      if (response.code == 200) {
        setOpen(false);
        setConfirmLoading(false);
        handleCancel();
        setRefresh((state) => !state);
      } else {
        dispatch(logoutAction());
      }
    };
    fetchData();
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
