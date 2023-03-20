import React from "react";
import { Tag, Progress } from "antd";
import "../scss/batch.scss";
import { useNavigate } from "react-router-dom";
import { convertTime } from "../configs/convertTime";

const Batch = ({ batch }) => {
  const navigate = useNavigate();
  const handleViewDetailBatch = () => {
    navigate(`/requester/manage/${batch.id}`);
  };
  return (
    <div className="batch">
      <div className="content">
        <div className="title">{batch.projectName}</div>
        <div className="bottom">
          <p>Expired in: {convertTime(batch.timeExpired)}</p>
          <div className="status">
            Status:{" "}
            <Tag
              color={
                batch.status === "working"
                  ? "gold"
                  : batch.status === "closed"
                  ? "red"
                  : "blue"
              }
            >
              {batch.status}
            </Tag>
          </div>
          <Progress
            percent={batch.result.progress ? batch.result.progress : 0}
            strokeColor="var(--green)"
          />
        </div>
        <div className="action">
          <button className="detail" onClick={handleViewDetailBatch}>
            Detail
          </button>
          <button className="delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Batch;
