import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import {
  ImportOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Papa from "papaparse";
import { message } from "antd";
import { getCategoriesNonTopics } from "../../services/category";
import {
  createTopic,
  getTopicById,
  uploadImageTopic,
} from "../../services/topic";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions";
function Create() {
  const [scroll, setScroll] = useState(0);
  const [render, setRender] = useState(false);
  const refElement = useRef(null);
  const [form] = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reqData, setReqData] = useState({});
  const [categories, setCategories] = useState([]);
  const initValue = {
    name: "",
    questions: [{ question: "", answers: ["", "", "", ""], correctAnswer: 0 }],
  };
  const dispatch = useDispatch();
  const optionScoll = {
    behavior: "smooth",
    block: "center",
  };
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async (id) => {
      const topicResponse = await getTopicById(id);
      if (topicResponse) {
        const topic = topicResponse.data;
        const formValue = {
          name: topic.name,
          questions: topic.questions?.map((item, _) => {
            return {
              question: item.question,
              correctAnswer: item.correctAnswer,
              answers: item.answers?.map((subItem, _) => {
                return subItem.answer;
              }),
            };
          }),
        };
        form.setFieldsValue(formValue);
      } else {
        dispatch(logoutAction());
      }
    };
    if (id) {
      fetchData(id);
    } else {
      form.setFieldsValue(initValue);
    }
  }, [id]);

  const handleImport = (file) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      encoding: "ISO-8859-1",
      complete: function (result) {
        message.success("import successfully");
        const obj = result.data;
        console.log(obj);
        let newArr = [];
        newArr = obj.map((e, i) => {
          return {
            question: e[0],
            answers: e.slice(1),
          };
        });

        form.setFieldsValue({
          questions: newArr.slice(1),
        });
      },
    });
    return false;
  };
  const handleFinish = async (value) => {
    setReqData(value);
    showModal();
  };
  useEffect(() => {
    refElement.current?.scrollIntoView(optionScoll);
    const fetchData = async () => {
      const categoriesResponse = await getCategoriesNonTopics();
      const categoriesDTO = categoriesResponse?.data?.map((item, _) => {
        return {
          value: item,
          label: item,
        };
      });
      setCategories(categoriesDTO);
    };
    try {
      fetchData();
    } catch (error) {
      dispatch(logoutAction());
    }
  }, [render, scroll]);
  const handleRadio = (e) => {
    const pathName = ["questions", e.target.name];
    const object = form.getFieldValue(pathName);
    form.setFieldValue(pathName, { ...object, correctAnswer: e.target.value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [addImage, setAddImage] = useState(true);
  const onHandleModelForm = async (value) => {
    const image = value.file?.file;
    const request = {
      ...reqData,
      category: value.category,
    };

    try {
      setLoading(true);
      const topicResponse = await createTopic(request);
      const imageResponse = await uploadImageTopic(topicResponse.data.id, {
        image: image,
      });
      setLoading(false);
      navigate(`/detail-topics/${topicResponse.data.id}`);
    } catch (e) {
      console.log(e);
      dispatch(logoutAction());
    }
  };

  return (
    <>
      <Modal
        title={<h2>Tạo mới Quizz</h2>}
        open={isModalOpen}
        onCancel={handleCancel}
        cancelText="Hủy"
        okText="Xuất bản"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        modalRender={(dom) => (
          <Form layout="vertical" onFinish={onHandleModelForm}>
            {dom}
          </Form>
        )}
      >
        <Form.Item label={<h3>Tải ảnh lên (Tùy chọn) </h3>} name={"file"}>
          <Upload
            onChange={(e) => {
              e.fileList.length > 0 ? setAddImage(false) : setAddImage(true);
            }}
            listType="picture-card"
            beforeUpload={(e) => false}
          >
            {addImage ? <div>upload</div> : ""}
          </Upload>
        </Form.Item>
        <Form.Item
          label={<h3>Chọn chủ đề</h3>}
          name={"category"}
          initialValue={categories[0]?.value}
        >
          <Select options={categories} />
        </Form.Item>
      </Modal>

      <div className="createQuestion ">
        <div className="container">
          {initValue && (
            <Form
              scrollToFirstError={optionScoll}
              className="animate__fadeIn"
              form={form}
              layout="vertical"
              onFinish={handleFinish}
            >
              <Form.Item
                className="header"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tên Quizz!",
                  },
                ]}
              >
                <TextArea
                  autoSize
                  style={{ width: "80%", height: "auto" }}
                  className="title"
                  placeholder={"MẪU KHÔNG CÓ TIÊU ĐỀ"}
                  variant="borderless"
                />
              </Form.Item>

              <Form.List name={"questions"}>
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map((field, index) => {
                        return (
                          <Form.Item className="form__item animate__fadeInUp">
                            <Form.Item
                              name={[field.name, "question"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Không được để trống!",
                                },
                              ]}
                            >
                              <TextArea
                                className="textArea"
                                placeholder="Câu hỏi"
                                autoSize={{
                                  minRows: 2,
                                  maxRows: 6,
                                }}
                              />
                            </Form.Item>
                            <div
                              ref={scroll == index ? refElement : null}
                            ></div>
                            <Form.List name={[field.name, "answers"]}>
                              {(subFields, subOperation) => {
                                return (
                                  <>
                                    <Radio.Group
                                      name={field.name}
                                      onChange={handleRadio}
                                      className="radio__group"
                                      defaultValue={
                                        form.getFieldValue().questions[index]
                                          .correctAnswer
                                      }
                                    >
                                      <Space
                                        className="space"
                                        size={"large"}
                                        direction="vertical"
                                      >
                                        {subFields.map((subField, subIndex) => {
                                          return (
                                            <>
                                              <Flex align="center">
                                                <Radio value={subIndex} />
                                                <Form.Item
                                                  name={subField.name}
                                                  noStyle
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message: "",
                                                    },
                                                  ]}
                                                >
                                                  <TextArea
                                                    placeholder={`Tùy chọn ${
                                                      subIndex + 1
                                                    }`}
                                                    autoSize
                                                  />
                                                </Form.Item>
                                                {subFields.length > 1 && (
                                                  <Tooltip
                                                    placement="bottom"
                                                    arrow={false}
                                                    title={"Xóa"}
                                                  >
                                                    <Button
                                                      type="text"
                                                      icon={
                                                        <CloseOutlined
                                                          style={{
                                                            fontSize: 20,
                                                          }}
                                                        />
                                                      }
                                                      size="large"
                                                      shape="circle"
                                                      onClick={() =>
                                                        subOperation.remove(
                                                          subField.name
                                                        )
                                                      }
                                                    />
                                                  </Tooltip>
                                                )}
                                              </Flex>
                                            </>
                                          );
                                        })}
                                        <Button
                                          onClick={() => {
                                            subOperation.add();
                                          }}
                                        >
                                          Thêm tùy chọn
                                        </Button>
                                      </Space>
                                    </Radio.Group>
                                  </>
                                );
                              }}
                            </Form.List>
                            <Flex justify="flex-end">
                              <Space>
                                <Tooltip
                                  placement="bottom"
                                  arrow={false}
                                  title={"Sao Chép"}
                                >
                                  <Button
                                    type="text"
                                    icon={
                                      <CopyOutlined style={{ fontSize: 24 }} />
                                    }
                                    size="large"
                                    shape="circle"
                                    onClick={() => {
                                      setScroll(field.name + 1);
                                      setRender(!render);
                                      add(
                                        form.getFieldsValue().questions[
                                          field.name
                                        ],
                                        field.name + 1
                                      );
                                    }}
                                  />
                                </Tooltip>
                                {fields.length > 1 ? (
                                  <Tooltip
                                    placement="bottom"
                                    arrow={false}
                                    title={"Xóa"}
                                  >
                                    <Button
                                      type="text"
                                      icon={
                                        <DeleteOutlined
                                          style={{ fontSize: 24 }}
                                        />
                                      }
                                      size="large"
                                      shape="circle"
                                      onClick={() => remove(field.name)}
                                    />
                                  </Tooltip>
                                ) : (
                                  ""
                                )}
                              </Space>
                            </Flex>
                          </Form.Item>
                        );
                      })}
                      <div className="side-bar">
                        <Tooltip
                          className="item"
                          placement="right"
                          arrow={false}
                          title={"Thêm"}
                        >
                          <Button
                            type="text"
                            icon={
                              <PlusCircleOutlined style={{ fontSize: 24 }} />
                            }
                            size="large"
                            shape="circle"
                            onClick={() => {
                              setScroll(fields.length);
                              add({
                                question: "",
                                answers: ["", "", "", ""],
                                correctAnswer: 0,
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          className="item"
                          placement="right"
                          arrow={false}
                          title={"import"}
                        >
                          <Upload
                            accept=".csv"
                            showUploadList={false}
                            beforeUpload={handleImport}
                          >
                            <Button
                              type="text"
                              icon={<ImportOutlined style={{ fontSize: 24 }} />}
                              size="large"
                              shape="circle"
                            ></Button>
                          </Upload>
                        </Tooltip>

                        <Tooltip
                          className="item"
                          placement="right"
                          arrow={false}
                          title={"Gửi"}
                        >
                          <Button
                            type="primary"
                            htmlType="submit"
                            icon={<CheckOutlined />}
                          />
                        </Tooltip>
                      </div>
                    </>
                  );
                }}
              </Form.List>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default Create;
