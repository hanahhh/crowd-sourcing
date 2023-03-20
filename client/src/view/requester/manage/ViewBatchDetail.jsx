import { QuestionCircleOutlined } from "@ant-design/icons";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Dropdown, message, Progress, Tag } from "antd";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useLocation, useNavigate } from "react-router-dom";
import PreviewQuestion from "../../../components/PreviewQuestion";
import { convertTime } from "../../../configs/convertTime";
import HITStatus from "../../../configs/HITStatus";
import "../../../scss/batchDetail.scss";
import { closeBatch, getBatchByID } from "../../../service/batch";
import { hitAccept, hitReject } from "../../../service/hit";

const ViewBatchDetail = () => {
  const id = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const [batch, setBatch] = useState({});
  const [preview, setPreview] = useState(false);
  const [dataCSV, setDataCsv] = useState([[]]);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const allowedExtensions = ["csv"];

  const handleStopWorking = () => {
    closeBatch(batch.id, (res) => {
      if (res.data !== null) {
        message.success("Stop batch successful !");
        navigate("/requester/manage");
      } else {
        message.error(res.error.message);
      }
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <div>
          <p style={{ fontWeight: "bold" }}>
            How to upload the result file to evaluate worker results ?
          </p>
          <p>
            Step 1: Download the result file by clicking the{" "}
            <span style={{ fontWeight: "bold" }}>Download</span> button above.
          </p>
          <p>
            Step 2: Insert <span style={{ fontWeight: "bold" }}>"o"</span> to{" "}
            <span style={{ fontWeight: "bold" }}>accept</span> the worker result
            and insert <span style={{ fontWeight: "bold" }}>"x"</span> if you
            want to <span style={{ fontWeight: "bold" }}>reject</span> their
            work.
          </p>
          <p>
            Step 3: Upload the updated file and click the button{" "}
            <span style={{ fontWeight: "bold" }}>Upload</span> to save the
            result.
          </p>
        </div>
      ),
    },
  ];

  const handleFileChange = (e) => {
    setError("");
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      setFile(inputFile);
      if (!inputFile) return setError("Enter a valid file");
      const reader = new FileReader();

      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });

        setData(csv.data.slice(0, -1));
      };
      reader.readAsText(inputFile);
    }
  };
  const handleParse = () => {
    let approveList = [];
    let rejectList = [];
    data.forEach((hit) => {
      if (hit.Result === "o") approveList.push(hit.HIT_ID);
      else if (hit.Result === "x") rejectList.push(hit.HIT_ID);
    });
    approveList.length > 0 &&
      hitAccept({ hits: approveList }, (res) => {
        if (res.data !== null) {
          message.success("Upload accept result successfully !");
        } else {
          message.error(res.error.message);
        }
      });
    rejectList.length > 0 &&
      hitReject({ hits: rejectList }, (res) => {
        if (res.data !== null) {
          message.success("Upload reject result successfully !");
        } else {
          message.error(res.error.message);
        }
      });
    window.location.reload();
  };

  console.log(batch);

  useEffect(() => {
    getBatchByID(id, (res) => {
      if (res.data !== null) {
        setBatch(res.data);

        //setting image question
        let imageList = [];
        res.data.pack.map((img, index) => {
          if (index < res.data.imagePerHIT) {
            imageList.push(img);
            return;
          }
        });
        setImages(imageList);

        //setting data for csv download
        let datacsv = [];
        let questions = ["HIT_ID", "Worker", "Status"];
        const questionNum = res.data.questions.length;
        for (let i = 0; i < res.data.imagePerHIT; i++) {
          res.data.questions.map((question) => {
            questions.push(question.title);
          });
        }

        questions.push("Result");
        datacsv.push(questions);
        res.data.hits.map((answer) => {
          if (answer.answers.length !== 0) {
            let arr = [];
            arr.push(answer.id);
            arr.push(answer.user.username !== "" ? answer.user.username : "-");
            arr.push(answer.status !== null ? answer.status : "-");
            arr.push(...JSON.parse(answer.answers));

            if (answer.status === HITStatus.ACCEPTED) {
              arr.push("o");
            } else if (answer.status === HITStatus.REJECTED) {
              arr.push("x");
            } else {
              arr.push("-");
            }
            datacsv.push(arr);
          } else {
            let arr = [];
            arr.push(answer.id);
            arr.push(answer.user.username !== "" ? answer.user.username : "-");
            arr.push(answer.status !== null ? answer.status : "-");
            arr.push(
              ...Array.from("-".repeat(questionNum * res.data.imagePerHIT))
            );
            arr.push("-");
            datacsv.push(arr);
          }
        });
        setDataCsv(datacsv);
      } else {
        message.error(res.error.message);
      }
    });
  }, [data]);

  return (
    <CRow>
      <CCol xs="12" md="10" style={{ marginTop: "20px" }}>
        <CCard>
          <CCardBody>
            <div className="batch-detail">
              <div className="progress-board">
                <div className="progress-site">
                  <div className="header-board">
                    <p>Status</p>
                    <button onClick={handleStopWorking}>Stop working</button>
                  </div>
                  <p>
                    Status: <Tag color="gold">{batch.status}</Tag>
                  </p>
                  <Progress
                    percent={
                      batch?.result?.progress ? batch?.result?.progress : 0
                    }
                    strokeColor="var(--green)"
                  />
                </div>
                <p>Creation time: {convertTime(batch.createdAt)}</p>
                <p>Completion time: {convertTime(batch.createdAt)}</p>
              </div>
              <div className="down">
                <div className="setting">
                  <div className="header-board">
                    <p>Setting</p>
                  </div>
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <p style={{ fontWeight: "bold" }}>
                      <span style={{ color: "var(--green)" }}>
                        {batch.service?.name}{" "}
                      </span>
                      {batch.projectName}
                    </p>
                  </div>

                  <div className="title">{batch.title}</div>
                  <div className="description">
                    <p>Description: </p>
                    <p>{batch.description}</p>
                  </div>

                  {batch.workerRequire && (
                    <div className="qualification">
                      <p>Qualifications requires:</p>
                      <p>
                        {batch.workerRequire.age &&
                          `Age - ${batch.workerRequire.age}, `}
                        {batch.workerRequire.address &&
                          `Address - ${batch.workerRequire.address}, `}
                        {batch.workerRequire.master === true
                          ? `Master has been granted `
                          : " "}
                      </p>
                    </div>
                  )}
                  <div className="props">
                    <p>Number of image per HIT: {batch.imagePerHIT}</p>
                    <p>
                      Reward per HIT:{" "}
                      {`${batch.reward ? batch.reward : 0} VND`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        "."
                      )}
                    </p>
                  </div>
                  <div className="button-reveal">
                    <button onClick={() => setPreview(!preview)}>
                      HIT preview
                    </button>
                  </div>
                </div>
                <div className="result">
                  <div className="download">
                    <div className="header-board">
                      <p>Result</p>
                      <button>
                        <CSVLink
                          filename={`result-${Date.now().toString()}.csv`}
                          data={dataCSV}
                        >
                          Download
                        </CSVLink>
                      </button>
                    </div>
                    <div className="content">
                      <p>HIT working: {batch?.result?.hitWorking}</p>
                      <p>HIT approved: {batch?.result?.hitApproved}</p>
                      <p>HIT rejected: {batch?.result?.hitRejected}</p>
                      <div className="upload">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p>Upload permission file </p>
                          <Dropdown menu={{ items }} placement="bottomLeft">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <QuestionCircleOutlined />
                            </div>
                          </Dropdown>
                        </div>

                        <div className="upload-success">
                          <input
                            disabled={batch.autoPayment}
                            onChange={handleFileChange}
                            id="csvInput"
                            name="file"
                            type="File"
                          />
                          <button
                            disabled={batch.autoPayment}
                            onClick={handleParse}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cost">
                    <div className="header-board">
                      <p>Cost summary</p>
                    </div>
                    <p>
                      Estimated cost:{" "}
                      {`${
                        batch.estimateCost ? batch.estimateCost : 0
                      } VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                  </div>
                </div>
              </div>
              {preview && (
                <div className="preview">
                  <PreviewQuestion
                    images={images}
                    questions={batch.questions}
                  />
                </div>
              )}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ViewBatchDetail;
