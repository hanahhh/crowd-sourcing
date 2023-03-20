import React from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import "../../../scss/publish.scss";
import { useEffect } from "react";
import { getBatchByID, publishBatch } from "../../../service/batch";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Question from "../../../components/Question";
import { message, Tag } from "antd";
import PreviewQuestion from "../../../components/PreviewQuestion";
import { convertTime } from "../../../configs/convertTime";

const PublishProject = () => {
  const user = useSelector((state) => state.auth.data);
  const path = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const [batch, setBatch] = useState({});
  const [images, setImages] = useState([]);
  useEffect(() => {
    getBatchByID(path, (res) => {
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
      } else {
        message.error(res.error.message);
      }
    });
  }, []);

  const handlePublishBatch = () => {
    publishBatch({ data: { batch: batch.id } }, (res) => {
      if (res.data !== null) {
        message.success("Publish project successfully !");
        navigate("/requester/manage");
      } else {
        message.error(res.error.message);
      }
    });
  };
  console.log(batch);
  return (
    <div className="publish-project">
      <CRow>
        <CCol xs="12" md="7" className="mb-4">
          <CCard>
            <CCardBody>
              <div className="up-board">
                <div className="project-name">
                  Preview: {batch?.projectName}
                </div>
                <div className="board">
                  <p>Service: {batch.service?.name}</p>
                  <p>Requester: {user?.username}</p>
                  {batch.workerRequire && (
                    <p>
                      Qualifications requires:{" "}
                      {batch.workerRequire.age &&
                        `Age - ${batch.workerRequire.age}, `}
                      {batch.workerRequire.address &&
                        `Address - ${batch.workerRequire.address}, `}
                      {batch.workerRequire.master === true
                        ? `Master has been granted `
                        : " "}
                    </p>
                  )}
                  <p>
                    Reward per HIT:{" "}
                    {`${batch.reward} VND`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )}
                  </p>
                  <p>Task expired in: {convertTime(batch.timeExpired)}</p>
                </div>
                <div className="hit-preview">
                  <p style={{ color: "var(--green)", fontWeight: "bold" }}>
                    {batch.title}
                    {batch.autoPayment === true && (
                      <Tag color="var(--green)" style={{ marginLeft: "10px" }}>
                        Auto payment
                      </Tag>
                    )}
                  </p>
                  <p>{batch.description}</p>
                  <PreviewQuestion
                    images={images}
                    questions={batch.questions}
                  />
                  <div className="button">
                    <button onClick={handlePublishBatch}>Publish</button>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default PublishProject;
