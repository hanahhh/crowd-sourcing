import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Button, Form, Menu, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBatch } from "../../../service/batch";
import Design from "./createItem/Design";
import Preview from "./createItem/Preview";
import Properties from "./createItem/Properties";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const CreateHIT = () => {
  const [form] = Form.useForm();
  const [process, setProcess] = useState(1);
  const [exampleImage, setExampleImage] = useState("");
  const navigate = useNavigate();

  const onFinishCreateHIT = () => {
    const batch = form.getFieldValue();
    const newBatch = {
      service: batch.service,
      projectName: batch?.projectName,
      title: batch?.title,
      description: batch?.description,
      autoPayment: batch?.autoPayment,
      timeExpired: batch?.timeExpired.toISOString(),
      HITQuantity: batch?.HITQuantity,
      questions: batch.questions.map((question) => {
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
      pack: batch?.pack,
      reward: batch?.reward,
      imagePerHIT: batch.imagePerHIT,
      workerRequire: {
        age: batch?.age,
        address: batch?.address ? batch.address : "",
        master: batch?.master,
      },
    };

    createBatch({ data: newBatch }, (res) => {
      if (res.data !== null) {
        message.success("Create project successful !");
        navigate("/requester/dashboard");
      } else {
        message.error(res.error.message);
      }
    });
  };

  const items = [
    {
      label: "Enter Properties",
      key: "properties",
      value: 1,
    },
    {
      label: "Design layout",
      key: "design",
      value: 2,
    },
    {
      label: "Preview",
      key: "preview",
      value: 3,
    },
  ];

  return (
    <CRow style={{ height: "100%", marginBottom: "10px" }}>
      <CCol xs="12" md="10" style={{ margin: "20px" }}>
        <CCard>
          <CCardBody>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={"0"}
              style={{ border: "none !important" }}
            >
              {items.map((item, index) => {
                return (
                  <Menu.Item
                    key={index}
                    onClick={() => {
                      setProcess(item.value);
                    }}
                  >
                    <span>{item.label}</span>
                  </Menu.Item>
                );
              })}
            </Menu>
          </CCardBody>
          <CCardBody>
            <Form
              layout="vertical"
              form={form}
              style={{
                marginBottom: "0px",
                background: "var(--light-green)",
                padding: "30px 20px 10px 20px",
                borderRadius: "10px",
              }}
              onFinish={onFinishCreateHIT}
            >
              {process === 1 && <Properties form={form} />}
              {process === 2 && (
                <Design
                  form={form}
                  setExampleImage={setExampleImage}
                  exampleImage={exampleImage}
                />
              )}
              {process === 3 && (
                <Preview form={form} exampleImage={exampleImage} />
              )}
              <Form.Item
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {process !== 3 && (
                  <Button
                    style={{
                      background: "var(--green)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      width: "100px",
                    }}
                    block
                    onClick={() => setProcess(process + 1)}
                  >
                    Next
                  </Button>
                )}
                {process === 3 && (
                  <Button
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
                    Create
                  </Button>
                )}
              </Form.Item>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CreateHIT;
