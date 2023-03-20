import { CCard, CCol, CRow } from "@coreui/react";
import { Descriptions, Form, Input, message } from "antd";
import Password from "antd/lib/input/Password";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserMe } from "../../../service/hit";
import { updateUser } from "../../../service/hit";
const WokerAccount = () => {
  const [data, setData] = useState([]);
  const user_id = useSelector((state) => state.auth.data.id);

  useEffect(() => {
    getUserMe(user_id, (res) => {
      if (res.data !== null) {
        setData(res);
      }
    });
  }, []);

  console.log(data);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  data.master ? data.master : (data.master = "No");

  const onFinishUpdateProject = (values) => {
    let value = form.getFieldsValue();
    const dataSubmit = data;
    dataSubmit.name = value.name;
    dataSubmit.age = value.age;
    dataSubmit.email = value.email;
    dataSubmit.address = value.address;
    dataSubmit.phone = value.phone;
    console.log("data submit len");
    console.log(dataSubmit);
    updateUser(dataSubmit.id, { dataSubmit }, (res) => {
      if (res.data !== null) {
        message.success("Update project successfully !");
      } else {
        message.error(res.error.message);
      }
    });
  };

  const onFinishpass = (values) => {
    let pass = form.getFieldsValue();
    let dataSubmit = {
      password: pass.newpassword,
    };
    if (pass.newpassword == pass.renewpassword) {
      updateUser(data.id, { dataSubmit }, (res) => {
        if (res.data !== null) {
          message.success("Update user successfully !");
        } else {
          message.error(res.error.message);
        }
      });
    } else {
      message.error("Password does not match !");
    }
  };
  return (
    <CRow>
      <CCol xs="10" md="9" className="mb-4">
        <CCard style={{ position: "relative" }}>
          <Descriptions
            title="User Info"
            style={{
              color: "var(--green)",
              marginLeft: 20,
              marginTop: 30,
            }}
          ></Descriptions>
          <Form
            layout="vertical"
            form={form}
            style={{
              margin: "0px 30px",
              padding: "30px 20px 10px 20px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.3)",
            }}
            onFinish={onFinishUpdateProject}
          >
            <Form.Item
              style={{}}
              rules={[
                {
                  required: false,
                  message: "Please input project name",
                },
              ]}
              label={"User name"}
              labelAlign="left"
              name="username"
            >
              <Input className="disableButton" disabled />
            </Form.Item>
            <Form.Item
              style={{}}
              rules={[
                {
                  required: false,
                  message: "Please input project name",
                },
              ]}
              label={"Master"}
              labelAlign="left"
              name="master"
            >
              <Input className="disableButton" disabled />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: false,
                  message: "",
                },
              ]}
              label={"User ID"}
              labelAlign="left"
              name="id"
            >
              <Input className="disableButton" disabled />
            </Form.Item>
            <Form.Item
              style={{}}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              label={"Name"}
              labelAlign="left"
              name="name"
            >
              <Input placeholder="Please input your Name" />
            </Form.Item>
            <Form.Item
              style={{}}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              label={"Age"}
              labelAlign="left"
              name="age"
            >
              <Input placeholder="Please input your Age" />
            </Form.Item>
            <Form.Item
              style={{}}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              label={"Phone Number"}
              labelAlign="left"
              name="phone"
            >
              <Input placeholder="Please input your Phone Number" />
            </Form.Item>
            <Form.Item
              style={{}}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              label={"Email"}
              labelAlign="left"
              name="email"
            >
              <Input placeholder="Please input your Email" />
            </Form.Item>
            <Form.Item
              style={{}}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              label={"Address"}
              labelAlign="left"
              name="address"
            >
              <Input placeholder="Please input your Address" />
            </Form.Item>
            <button
              onClick={onFinishUpdateProject}
              style={{
                background: "var(--green)",
                color: "white",
                border: "none",
                width: "150px",
                height: "40px",
                borderRadius: "5px",
                cursor: "pointer",
                float: "right",
                marginLeft: "10%",
              }}
              htmlType="submit"
            >
              Update
            </button>
          </Form>

          <Descriptions
            title="Password & security"
            style={{
              color: "var(--green)",
              marginLeft: 20,
              marginTop: 50,
            }}
          >
            <Descriptions.Item
              style={{ padding: 0 }}
              label="Change Password"
            ></Descriptions.Item>
          </Descriptions>

          <Form
            layout="vertical"
            form={form}
            style={{
              margin: "0px 30px 20px 30px",
              padding: "20px 20px 10px 20px",
              borderRadius: "10px",
            }}
            onFinish={onFinishpass}
          >
            <Form.Item
              style={{}}
              rules={[
                {
                  required: false,
                  message: "Please input",
                },
              ]}
              label={"New Password"}
              labelAlign="left"
              name="newpassword"
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              style={{}}
              rules={[
                {
                  required: false,
                  message: "Please input",
                },
              ]}
              label={"Re-enter Password"}
              labelAlign="left"
              name="renewpassword"
            >
              <Input type="password" />
            </Form.Item>
          </Form>
          <button
            onClick={onFinishpass}
            style={{
              position: "absolute",
              background: "var(--green)",
              color: "white",
              border: "none",
              width: "160px",
              height: "30px",
              borderRadius: "5px",
              cursor: "pointer",
              top: "97%",
              right: "4%",
              // marginLeft: "20%",
            }}
            htmlType="submit"
          >
            Change Pasword
          </button>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default WokerAccount;
