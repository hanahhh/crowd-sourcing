import { message } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPublishedBatch } from "../../../service/batch";
import Batch from "../../../components/Batch";
import "../../../scss/manageBatch.scss";

const ManageBatch = () => {
  const [batches, setBatches] = useState([]);
  useEffect(() => {
    getAllPublishedBatch({}, {}, {}, (res) => {
      if (res.data !== null) {
        setBatches(res.data);
      } else {
        message.error(res.error.message);
      }
    });
  }, []);
  console.log(batches);
  return (
    <div className="manage-batch">
      {batches.map((batch, index) => {
        return <Batch key={index} batch={batch} />;
      })}
    </div>
  );
};

export default ManageBatch;
