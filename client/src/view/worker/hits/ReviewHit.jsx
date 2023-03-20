import React from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect } from "react";
import { getHitByID } from "../../../service/hit";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Question from "../../../components/Question";
import { message, Descriptions } from "antd";
import PreviewQuestion from "../../../components/PreviewQuestion";
import { convertTime } from "../../../configs/convertTime";
const ReviewHit = () => {
  const user = useSelector((state) => state.auth.data);
  const path = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const [HITs, setHITs] = useState({});
  useEffect(() => {
    getHitByID(path, (res) => {
      if (res.data !== null) {
        setHITs(res.data);
      } else {
        message.error(res.error.message);
      }
    });
  }, []);
  let images = HITs.images;
  let questions = HITs.batch?.questions;

  let autoPm = "No";

  return (
    <CRow>
      <CCol xs="12" md="8" className="mb-4">
        <CCard>
          <CCardBody
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "var(--green)",
              position: "relative",
            }}
          >
            Preview: {HITs.batch?.projectName}
          </CCardBody>

          <div
            style={{
              backgroundColor: "rgba(20,168,0,0.1)",
              borderRadius: "5px",
            }}
          >
            <Descriptions
              title="Hit Info"
              style={{ margin: 20, marginBottom: 0, fontWeight: "500" }}
            >
              <Descriptions.Item label="ID">{HITs.id}</Descriptions.Item>
              <Descriptions.Item label="Title">
                {HITs.batch?.title}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              title=""
              style={{ marginLeft: 20, fontWeight: "500" }}
            >
              <Descriptions.Item label="Project Name">
                {HITs.batch?.projectName}
              </Descriptions.Item>
              <Descriptions.Item label="Descriptions">
                {HITs.batch?.description}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              title=""
              style={{ marginLeft: 20, fontWeight: "500" }}
            >
              <Descriptions.Item label="Auto Payment">
                {autoPm}
              </Descriptions.Item>
              <Descriptions.Item label="Time Publish">
                {convertTime(HITs.batch?.publishedAt)}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              title=""
              style={{ marginLeft: 20, fontWeight: "500" }}
            >
              <Descriptions.Item label="Reward">
                {`${HITs.batch?.reward ? HITs.batch.reward : 0} VND`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Time EXpired">
                {convertTime(HITs.batch?.timeExpired)}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div
            style={{
              backgroundColor: "rgba(20,168,0,0.1)",
              borderRadius: "5px",
              marginTop: 50,
            }}
          >
            <Descriptions
              title="Hit Review"
              style={{ marginLeft: 20, marginTop: 20, fontWeight: "500" }}
            ></Descriptions>
            <div style={{ padding: "20px" }}>
              <PreviewQuestion images={images} questions={questions} />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => navigate(`/worker/accept/${path}`)}
                  style={{
                    background: "var(--green)",
                    color: "white",
                    border: "none",
                    width: "120px",
                    height: "30px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Accept & Work
                </button>
              </div>
            </div>
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ReviewHit;
