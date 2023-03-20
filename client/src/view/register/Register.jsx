import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Input, Divider, Radio, message } from "antd";
import { register } from "../../service/user";

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

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = () => {
    const data = form.getFieldValue();
    register(data, (res) => {
      if (res.data !== null) {
        message.success("Register successful !");
        navigate("/login");
      } else {
        message.error(res.error.message);
      }
    });
  };
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Col
          style={{
            minWidth: "350px",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "white",
            padding: "30px 10px",
            borderRadius: "10px",
            border: "1px solid #DBDBDB",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Form
            form={form}
            {...formItemLayout}
            onFinish={onFinish}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label={"User name"}
              labelAlign="left"
              name="username"
            >
              <Input placeholder="Please input user name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label={"Email"}
              labelAlign="left"
              name="email"
            >
              <Input placeholder="Please input user name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label={"Password"}
              labelAlign="left"
              name="password"
            >
              <Input.Password placeholder="Please input password" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please choose role",
                },
              ]}
              label={"Role"}
              labelAlign="left"
              name="role"
              initialValues="Requester"
            >
              <Radio.Group initialValues="Requester">
                <Radio value="Requester">Requester</Radio>
                <Radio value="Worker">Worker</Radio>
              </Radio.Group>
            </Form.Item>
            <button
              htmltype="submit"
              style={{
                borderRadius: "10px",
                border: "none",
                outline: "none",
                background: "var(--green)",
                color: "white",
                padding: "3px 20px",
              }}
            >
              Register
            </button>
          </Form>
          <Divider style={{ color: "grey", fontSize: "14px" }}>
            Already have an UpToYOU account?
          </Divider>
          <button
            onClick={() => navigate("/login")}
            style={{
              borderRadius: "10px",
              border: "1px solid #DBDBDB",
              background: "white",
              padding: "3px 20px",
            }}
          >
            Login
          </button>
        </Col>
      </Row>
    </>
  );
};

export default Register;
