import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  Button,
  Space,
  message,
} from "antd";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getBatchByID,
  uploadImageBatch,
  updateBatchByID,
} from "../../../service/batch";
import questionType from "../../../configs/questionType";

const { TextArea } = Input;
const props = {
  name: "file",
  multiple: true,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const { Dragger } = Upload;

const EditProject = () => {
  const [project, setProject] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const serviceList = useSelector((state) => state.services.data);
  const project_id = useLocation().pathname.split("/")[3];
  let files = [];
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getBatchByID(project_id, (res) => {
      if (res.data !== null) {
        setProject(res.data);
      }
    });
  }, []);

  useEffect(() => {
    const dataForm = {
      service: project?.service?.id,
      projectName: project?.projectName,
      title: project?.title,
      description: project?.description,
      reward: project?.reward,
      imagePerHIT: project?.imagePerHIT,
      autoPayment: project?.autoPayment,
      master: project?.workerRequire?.master
        ? project?.workerRequire?.master
        : false,
      age: project?.workerRequire?.age ? project?.workerRequire?.age : 0,
      address: project?.workerRequire?.address
        ? project?.workerRequire?.address
        : "",
      timeExpired: dayjs(project?.timeExpired, "HH:mm DD-MM-YYYY"),
      questions: project?.questions,
    };
    form.setFieldsValue(dataForm);
    console.log(dataForm, project);
  }, [project]);

  const onChangeServiceType = (e) => {
    form.setFieldsValue({
      service: e,
    });
  };

  const onFinishUpdateProject = (values) => {
    const dataSubmit = {
      service: values.service,
      projectName: values.projectName,
      title: values.title,
      description: values.description,
      reward: values.reward,
      imagePerHIT: values.imagePerHIT,
      autoPayment: values.autoPayment,
      pack: imageList.length > 0 ? imageList : values.pack,
      workerRequire: {
        age: values.age,
        address: values.address,
        master: values.master,
      },
      timeExpired: values.timeExpired.toISOString(),
      questions: values.questions.map((question) => {
        if (Array.isArray(question.select)) {
          return {
            title: question.title,
            type: question.type,
            answers: question.select,
          };
        } else {
          return {
            title: question.title,
            type: question.type,
          };
        }
      }),
    };
    updateBatchByID(project_id, { data: dataSubmit }, (res) => {
      if (res.data !== null) {
        message.success("Update project successfully !");
        navigate("/requester/dashboard");
      } else {
        message.error(res.error.message);
      }
    });
  };

  const uploadImage = (options) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("files", file);

    uploadImageBatch(formData, (res) => {
      if (res.data !== null) {
        files.push(res[0]?.id);
        setImageList([...imageList, ...files]);
      }
    });
  };

  return (
    <CRow>
      <CCol xs="12" md="10" style={{ marginTop: "20px" }}>
        <CCard>
          <CCardBody>
            <div>
              <Form
                layout="vertical"
                form={form}
                style={{
                  marginBottom: "0px",
                  background: "var(--light-green)",
                  padding: "30px 20px 10px 20px",
                  borderRadius: "10px",
                }}
                onFinish={onFinishUpdateProject}
              >
                <Dragger
                  {...props}
                  customRequest={uploadImage}
                  showUploadList={false}
                  multiple={true}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label={"Service type"}
                  labelAlign="left"
                  name="service"
                >
                  <Select
                    showSearch
                    placeholder="Select a service"
                    onChange={(e) => onChangeServiceType(e)}
                    options={serviceList}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input project name",
                    },
                  ]}
                  label={"Project name"}
                  labelAlign="left"
                  name="projectName"
                >
                  <Input placeholder="Please input project name" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input title",
                    },
                  ]}
                  label={"Title"}
                  labelAlign="left"
                  name="title"
                >
                  <Input placeholder="Please input title" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input instruction",
                    },
                  ]}
                  label={"Description"}
                  labelAlign="left"
                  name="description"
                >
                  <TextArea rows={4} placeholder="Please input instruction" />
                </Form.Item>
                <p
                  style={{
                    color: "var(--green)",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Setup task
                </p>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input project name",
                    },
                  ]}
                  label={"Reward"}
                  labelAlign="left"
                  name="reward"
                >
                  <InputNumber
                    formatter={(value) =>
                      `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    }
                    parser={(value) => value.replace(/VND\s?|(,*)/g, "")}
                    placeholder="Please input reward"
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input project name",
                    },
                  ]}
                  label={"Image per HIT"}
                  labelAlign="left"
                  name="imagePerHIT"
                >
                  <InputNumber placeholder="Please input image per HIT" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please choose expired date",
                    },
                  ]}
                  label={"Task expired in"}
                  labelAlign="left"
                  name="timeExpired"
                >
                  <DatePicker
                    showTime={{
                      format: "HH:mm",
                    }}
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please check auto approve for worker",
                    },
                  ]}
                  label={"Auto approve"}
                  labelAlign="left"
                  name="autoPayment"
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>

                <p
                  style={{
                    color: "var(--green)",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Worker requirement
                </p>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please check the worker status",
                    },
                  ]}
                  label={"Master"}
                  labelAlign="left"
                  name="master"
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label={"Age required"} labelAlign="left" name="age">
                  <InputNumber placeholder="Please check age required" />
                </Form.Item>
                <Form.Item label={"Address"} labelAlign="left" name="address">
                  <Input placeholder="Please input address required" />
                </Form.Item>
                <Form.List name="questions">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field) => (
                          <>
                            <Space
                              key={field.key}
                              style={{
                                display: "flex",
                                marginBottom: 8,
                                flexDirection: "column",
                              }}
                              align="start"
                            >
                              <Form.Item
                                {...field}
                                label="Question type"
                                name={[field.name, "type"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "This field is required !",
                                  },
                                ]}
                              >
                                <Radio.Group>
                                  <Radio value={questionType.SINGLE}>
                                    Single Choice
                                  </Radio>
                                  <Radio value={questionType.MULTI}>
                                    Multiple Choice
                                  </Radio>
                                  <Radio value={questionType.INPUT}>
                                    Input
                                  </Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label="Question"
                                name={[field.name, "title"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing last name",
                                  },
                                ]}
                              >
                                <Input placeholder="Last Name" />
                              </Form.Item>

                              <Form.List name={[field.name, "select"]}>
                                {(nicknames, { add, remove }) => {
                                  return (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      {nicknames.map((nickname) => (
                                        <Space key={nickname.key} align="start">
                                          <Form.Item
                                            {...nickname}
                                            name={[nickname.name, "name"]}
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "This field is required !",
                                              },
                                            ]}
                                          >
                                            <Input placeholder="Please input answer !" />
                                          </Form.Item>

                                          <MinusCircleOutlined
                                            onClick={() => {
                                              remove(nickname.name);
                                            }}
                                          />
                                        </Space>
                                      ))}

                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                          block
                                        >
                                          <PlusOutlined /> Add answer
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  );
                                }}
                              </Form.List>
                              <MinusCircleOutlined
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </Space>
                          </>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            block
                          >
                            <PlusOutlined /> Add question
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
                <Form.Item
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    onClick={onFinishUpdateProject}
                    style={{
                      background: "var(--green)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      width: "100px",
                    }}
                    block
                    htmlType="submit"
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EditProject;
