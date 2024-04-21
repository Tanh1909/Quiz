import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Radio,
  Space,
  Tooltip,
  Upload,
} from "antd";
import {
  ImportOutlined,
  CheckOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Papa from "papaparse";
import { message } from "antd";
function CreateQuestion() {
  const [scroll, setScroll] = useState(0);
  const [render, setRender] = useState(false);
  const refElement = useRef(null);
  const [form] = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const optionScoll = {
    behavior: "smooth",
    block: "center",
  };
  console.log("render");
  const initValue = {
    questions: [{ question: "", answers: ["", "", "", ""] }],
  };
  const handleImport = (file) => {
    console.log(file);
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
    console.log(refElement.current);
  };
  useEffect(() => {
    refElement.current?.scrollIntoView(optionScoll);
  }, [render, scroll]);
  const handleRadio = (e) => {
    const pathName = ["questions", e.target.name];
    const object = form.getFieldValue(pathName);
    form.setFieldValue(pathName, { ...object, correctAnswer: e.target.value });
  };
  return (
    <>
      <div className="createQuestion animate__fadeInUp">
        <div className="container">
          <Flex className="header">
            <TextArea
              autoSize
              style={{ width: "80%", height: "auto" }}
              className="title"
              defaultValue={"MẪU KHÔNG CÓ TIÊU ĐỀ"}
              variant="borderless"
            />
          </Flex>
          <Form
            scrollToFirstError={optionScoll}
            className="animate__fadeIn"
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={initValue}
          >
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
                                message: "Please input!",
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
                          <div ref={scroll == index ? refElement : null}></div>
                          <Form.List name={[field.name, "answers"]}>
                            {(subFields, subOperation) => {
                              return (
                                <>
                                  <Radio.Group
                                    name={field.name}
                                    onChange={handleRadio}
                                    className="radio__group"
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
                    <Flex
                      vertical
                      align="center"
                      justify="space-between"
                      className="sider-bar"
                      gap={"middle"}
                    >
                      <Tooltip placement="right" arrow={false} title={"Thêm"}>
                        <Button
                          type="text"
                          icon={<PlusCircleOutlined style={{ fontSize: 24 }} />}
                          size="large"
                          shape="circle"
                          onClick={() => {
                            setScroll(fields.length);
                            add({ question: "", answers: ["", "", "", ""] });
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="right" arrow={false} title={"import"}>
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

                      <Tooltip placement="right" arrow={false} title={"Gửi"}>
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          icon={<CheckOutlined />}
                        />
                      </Tooltip>
                    </Flex>
                  </>
                );
              }}
            </Form.List>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CreateQuestion;
