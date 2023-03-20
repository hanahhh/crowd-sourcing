import React from "react";
import { Progress, Tag } from "antd";
import "../../../scss/workerList.scss";
import { useEffect } from "react";
import { getAllWorker, searchWorker } from "../../../service/user";
import { useState } from "react";
const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    getAllWorker({}, {}, {}, (res) => {
      if (res.data !== null) {
        setWorkers(res);
      }
    });
  }, []);
  const handleSearchWorker = (e) => {
    const search = e.target.value;
    searchWorker(search, {}, {}, {}, (res) => {
      if (res.data !== null) {
        setWorkers(res);
      }
    });
  };
  return (
    <div className="workers">
      <div className="instance-search">
        <p>Search for worker</p>
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault();
            handleSearchWorker(e);
          }}
        />
      </div>
      <div className="worker-list">
        {workers.map((worker, index) => {
          return (
            <div className="worker" key={index}>
              <div className="top">
                <p>{worker.username}</p>
                <Tag color={worker.master ? "var(--green)" : "yellow"}>
                  {worker.master ? "Master" : "Amateur"}
                </Tag>
              </div>
              <div className="info">
                <p>Age: {worker.age}</p>
                <p>Address: {worker.address ? worker.address : "Vietnam"}</p>
                Approval rate:{" "}
                <Progress
                  width={40}
                  type="circle"
                  percent={worker.approvalRate}
                  strokeColor="var(--green)"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkerList;
