import { Card, Flex, Popconfirm, Space } from "antd";
import {
  DeleteOutlined,
  OrderedListOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { timeAgo } from "../../utils/DateUtils";
import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/images/defaultImageCard.webp";
import { deleteTopicById } from "../../services/topic";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions";
import Item from "antd/es/list/Item";
function CustomCard({ hoverable, topic, action, topics, setTopics }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //start delete handle

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    setConfirmLoading(true);
    const response = await deleteTopicById(topic.id);
    if (response.code == 200) {
      setTopics(topics.filter((item, _) => item.id != topic.id));
      setConfirmLoading(false);
      handleCancel();
    } else {
      dispatch(logoutAction());
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //end delete handle
  //start edit handle
  const handleEdit = (id) => {
    navigate(`/edit-topic/${id}`);
  };
  const handleNavigate = (id) => {
    navigate(`/detail-topics/${id}`);
  };

  return (
    <>
      <Flex className="CustomCard">
        <Card
          hoverable={hoverable}
          className="card"
          actions={
            action && [
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
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={showPopconfirm}
                  key="delete"
                />
              </Popconfirm>,
              <EditOutlined onClick={() => handleEdit(topic.id)} key="edit" />,
            ]
          }
        >
          <Flex gap={20} onClick={() => handleNavigate(topic.id)}>
            <img
              style={{
                objectFit: "contain",
              }}
              className="img"
              src={topic?.image || defaultImage}
            />
            <Flex
              style={{ height: "100%" }}
              vertical
              gap={10}
              align="start"
              justify="center"
            >
              <h3>{topic?.name}</h3>
              <Space>
                <OrderedListOutlined />
                <div>{topic?.questions?.length + " Câu hỏi"}</div>
              </Space>
              <Flex align="center" gap={10}>
                {topic.user && (
                  <>
                    <img
                      className="avatar"
                      src={topic.user.avatar}
                      alt="avatar"
                    />
                    <div>{topic.user.fullName}</div>
                  </>
                )}
                <div>{timeAgo(topic?.createdAt)}</div>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

export default CustomCard;
