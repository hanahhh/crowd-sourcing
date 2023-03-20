import React from "react";
import { Col, Row, Form, Input, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/action/auth";
import { useEffect } from "react";
import { storeUserData } from "../../service/auth";
import Roles from "../../configs/roles";

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

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(userLogin(values));
  };

  useEffect(() => {
    console.log(user);
    if (!user.data) {
      message.error(user.message);
    } else {
      storeUserData(user.data);
      message.success(user.message);
      if (user.data.role === Roles.REQUESTER) {
        navigate("/requester/dashboard");
      } else if (user.data.role === Roles.WORKER) {
        navigate("/worker/hits");
      }
    }
  }, [user]);

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
              name="identifier"
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
            <button
              htmltype="submit"
              style={{
                borderRadius: "10px",
                border: "none",
                outline: "none",
                background: "var(--green)",
                color: "white",
                padding: "4px 20px",
              }}
            >
              Login
            </button>
          </Form>
          <Divider style={{ color: "grey", fontSize: "14px" }}>
            Don't have an UpToYOU account?
          </Divider>
          <button
            onClick={() => navigate("/register")}
            style={{
              borderRadius: "10px",
              border: "1px solid #DBDBDB",
              background: "white",
              padding: "3px 20px",
            }}
          >
            Register
          </button>
        </Col>
      </Row>
    </>
  );
};

export default Login;
