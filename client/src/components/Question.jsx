import { Checkbox, Input, Radio } from "antd";
import React from "react";
import questionType from "../configs/questionType";

const Question = ({ question }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "5px" }}>
        <span style={{ color: "var(--green)", fontWeight: "bold" }}>
          {"Question: "}
        </span>
        {question?.title}
      </div>

      {question.type === questionType.SINGLE && (
        <div>
          <Radio.Group>
            {question?.select?.map((answer, key) => (
              <Radio value={key} key={key}>
                {" "}
                {answer.name}{" "}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      )}
      {question.type === questionType.MULTI && (
        <div>
          <Checkbox.Group>
            {question?.select.map((answer, key) => (
              <Checkbox value={key} key={key}>
                {" "}
                {answer.name}{" "}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      )}
      {question.type === questionType.INPUT && (
        <div>
          <Input placeholder={"Please input an answer"} />
        </div>
      )}
    </div>
  );
};

export default Question;
