import { Space } from "antd";
import React from "react";
import PreviewQuestion from "../../../../components/PreviewQuestion";
import Question from "../../../../components/Question";
import { serviceList } from "../../../../configs/serviceList";

const Preview = ({ form, exampleImage }) => {
  const data = form.getFieldValue();
  console.log(data, exampleImage);
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: "flex", marginBottom: "20px" }}
    >
      <div
        style={{
          width: "fit-content",
          height: "30px",
          background: "var(--green)",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        <span style={{ color: "white", fontSize: "16px" }}>
          Service: {serviceList[data.service - 1]?.label} - {data?.title}
        </span>
      </div>
      <span>
        <span style={{ fontWeight: "bold" }}>Instruction: </span>{" "}
        {data.description}
      </span>
      <div>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <PreviewQuestion images={exampleImage} questions={data.questions} />
        </Space>
      </div>
    </Space>
  );
};

export default Preview;
