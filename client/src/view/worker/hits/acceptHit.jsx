import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Button, Checkbox, Form, message, Radio, Space, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { convertTime } from "../../../configs/convertTime";
import questionType from "../../../configs/questionType";
import { getHitByID, submitHIT } from "../../../service/hit";
const AcceptHit = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.data);
  const path = useLocation().pathname.split("/")[3];
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const [HITs, setHITs] = useState({});
  useEffect(() => {
    getHitByID(path, (res) => {
      if (res.data !== null) {
        setHITs(res.data);
        setImages(res.data.images);
        const questions = res.data.images.map((image, index) => {
          return {
            image: image,
            questions: res.data.batch.questions,
          };
        });
        setData({ pack: questions });
      } else {
        message.error(res.error.message);
      }
    });
  }, []);
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  console.log(HITs);
  const onFinish = (values) => {
    let dataForm = [];
    console.log(values);
    values.pack.map((val) => {
      val.questions.map((ques) => {
        let answer = "";
        if (Array.isArray(ques.answer)) {
          ques.answer.map((answ) => {
            answer += `${answ};`;
          });
        } else {
          answer += `${ques.answer}`;
        }
        dataForm.push(answer);
      });
    });
    submitHIT(path, { answers: JSON.stringify(dataForm) }, (res) => {
      if (res.data !== null) {
        message.success("Submit result successful !");
        navigate("/worker/dashboard");
      } else {
        message.error(res.error.message);
      }
    });
    console.log();
  };

  return (
    <CRow>
      <CCol xs="12" md="9" className="mb-4">
        <CCard>
          <CCardBody
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "var(--green)",
            }}
          >
            {HITs?.batch?.projectName}
          </CCardBody>
          <div
            style={{
              margin: 15,
              marginBottom: 0,
              fontWeight: "600",
              padding: "10px 0px 10px 15px",
              borderRadius: "5px",
              border: "1px solid rgba(20,168,0,0.7)",
            }}
          >
            {HITs?.batch?.title}:
            <div style={{ margin: 0, marginBottom: 0, fontWeight: "600" }}>
              {HITs?.batch?.description}
            </div>
          </div>
          <div
            style={{
              margin: 15,
              marginBottom: 0,
              fontWeight: "600",
              padding: "10px 0px 10px 15px",
              borderRadius: "5px",
              border: "1px solid rgba(20,168,0,0.7)",
            }}
          >
            Reward :{" "}
            {`${HITs?.batch?.reward ? HITs?.batch?.reward : 0} VND`.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            )}
            <div style={{ margin: 0, marginBottom: 0, fontWeight: "600" }}>
              Expired date: {convertTime(HITs.batch?.timeExpired)}
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                padding: "20px",
                background: "var(--light-green)",
              }}
            >
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Form.List name="pack">
                  {(fields) => {
                    return (
                      <div>
                        {fields.map((field, index) => (
                          <>
                            <Space
                              key={index}
                              style={{
                                display: "flex",
                                marginBottom: 8,
                                flexDirection: "column",
                              }}
                              align="start"
                            >
                              <img
                                style={{ width: "100%" }}
                                src={`http://localhost:1337${
                                  images[field.key]
                                }`}
                                alt="HIT-image"
                              />
                              <Form.List name={[field.name, "questions"]}>
                                {(nicknames) => {
                                  return (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      {nicknames.map((nickname, i) => (
                                        <Space
                                          key={i}
                                          align="start"
                                          direction="vertical"
                                        >
                                          <div style={{ marginBottom: "5px" }}>
                                            <span
                                              style={{
                                                color: "var(--green)",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              {"Question: "}
                                            </span>
                                            {
                                              data.pack[index].questions[i]
                                                ?.title
                                            }
                                          </div>

                                          {data.pack[index].questions[i]
                                            ?.type === questionType.SINGLE && (
                                            <Form.Item
                                              {...nickname}
                                              name={[nickname.name, "answer"]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message:
                                                    "This field is required !",
                                                },
                                              ]}
                                            >
                                              <Radio.Group>
                                                {data.pack[index].questions[
                                                  i
                                                ]?.select?.map(
                                                  (answer, key) => (
                                                    <Radio
                                                      value={key}
                                                      key={key}
                                                    >
                                                      {" "}
                                                      {answer.name}{" "}
                                                    </Radio>
                                                  )
                                                )}
                                              </Radio.Group>
                                            </Form.Item>
                                          )}
                                          {data.pack[index].questions[i]
                                            ?.type === questionType.MULTI && (
                                            <Form.Item
                                              {...nickname}
                                              name={[nickname.name, "answer"]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message:
                                                    "This field is required !",
                                                },
                                              ]}
                                            >
                                              <Checkbox.Group>
                                                {data.pack[index].questions[
                                                  i
                                                ]?.select.map((answer, key) => (
                                                  <Checkbox
                                                    value={key}
                                                    key={key}
                                                  >
                                                    {" "}
                                                    {answer.name}{" "}
                                                  </Checkbox>
                                                ))}
                                              </Checkbox.Group>
                                            </Form.Item>
                                          )}
                                          {data.pack[index].questions[i]
                                            ?.type === questionType.INPUT && (
                                            <Form.Item
                                              {...nickname}
                                              name={[nickname.name, "answer"]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message:
                                                    "This field is required !",
                                                },
                                              ]}
                                            >
                                              <Input
                                                placeholder={
                                                  "Please input an answer"
                                                }
                                              />
                                            </Form.Item>
                                          )}
                                        </Space>
                                      ))}
                                    </div>
                                  );
                                }}
                              </Form.List>
                            </Space>
                          </>
                        ))}
                      </div>
                    );
                  }}
                </Form.List>
                <Form.Item
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
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
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AcceptHit;
