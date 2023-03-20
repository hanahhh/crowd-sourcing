import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Radio, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import questionType from "../../../../configs/questionType";
import "../../../../scss/design.scss";
import { uploadImageBatch } from "../../../../service/batch";

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

const Design = ({ form, setExampleImage, exampleImage }) => {
  let files = [];
  let pack = [];
  const [imageList, setImageList] = useState([]);
  const service = form.getFieldValue().service;
  const imagePerHIT = form.getFieldValue().imagePerHIT;

  useEffect(() => {
    imageList.length !== 0 &&
      form.setFieldsValue({
        pack: imageList,
      });
  }, [imageList]);

  const uploadImage = (options) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("files", file);

    uploadImageBatch(formData, (res) => {
      if (res.data !== null) {
        files.push(res[0]?.id);
        if (pack.length < imagePerHIT) pack.push(res[0]?.url);
        setExampleImage([...exampleImage, ...pack]);
        setImageList([...imageList, ...files]);
      }
    });
  };
  return (
    <div className="design">
      {service !== 1 && (
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
      )}

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
                        <Radio value={questionType.SINGLE}>Single Choice</Radio>
                        <Radio value={questionType.MULTI}>
                          Multiple Choice
                        </Radio>
                        <Radio value={questionType.INPUT}>Input</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Question"
                      name={[field.name, "title"]}
                      rules={[{ required: true, message: "Missing last name" }]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>

                    <Form.List name={[field.name, "select"]}>
                      {(nicknames, { add, remove }) => {
                        return (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {nicknames.map((nickname) => (
                              <Space key={nickname.key} align="start">
                                <Form.Item
                                  {...nickname}
                                  name={[nickname.name, "name"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "This field is required !",
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
    </div>
  );
};

export default Design;
