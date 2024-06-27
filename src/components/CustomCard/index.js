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
function CustomCard({ hoverable, topic, user, onClick, action }) {
  const navigate = useNavigate();
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
  //start edit handle
  const handleEdit = (id) => {
    navigate(`/edit-topic/${id}`);
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
          <Flex gap={20} onClick={onClick}>
            <img className="img" src={topic?.image} />
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
                {user && (
                  <>
                    <img className="avatar" src={user.avatar} alt="avatar" />
                    <div>{user.fullName}</div>
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
