import { DatePicker, Form, Input, InputNumber, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../../scss/properties.scss";

const { TextArea } = Input;

const Properties = ({ form }) => {
  const [serviceTypeCheck, setServiceTypeCheck] = useState(false);
  const serviceList = useSelector((state) => state.services.data);
  useEffect(() => {
    const formValue = form.getFieldValue();
    if (formValue.service) setServiceTypeCheck(formValue.service);
  }, []);

  const onChangeServiceType = (e) => {
    setServiceTypeCheck(e);
    form.resetFields();
    form.setFieldsValue({
      service: e,
    });
  };

  return (
    <div className="properties">
      <p
        style={{ color: "var(--green)", fontWeight: "bold", fontSize: "18px" }}
      >
        Properties
      </p>

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
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      {serviceTypeCheck && (
        <>
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
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please check age required",
              },
            ]}
            label={"Age required"}
            labelAlign="left"
            name="age"
          >
            <InputNumber placeholder="Please check age required" />
          </Form.Item>
          <Form.Item label={"Address"} labelAlign="left" name="address">
            <Input placeholder="Please input address required" />
          </Form.Item>
        </>
      )}
    </div>
  );
};

export default Properties;
