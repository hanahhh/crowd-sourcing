import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertTime } from "../../../configs/convertTime";
import HITStatus from "../../../configs/HITStatus";
import { getHITByWorker, getStatic } from "../../../service/hit";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataS, setDataS] = useState([]);
  const user_id = useSelector((state) => state.auth.data.id);

  const navigate = useNavigate();
  const columns = [
    {
      title: "Date",
      dataIndex: "updatedAt",
      render: (date) => <>{convertTime(date)}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <>
          <Tag
            color={
              status === HITStatus.ACCEPTED
                ? "green"
                : status === HITStatus.REJECTED
                ? "red"
                : status === HITStatus.SUBMITTED
                ? "yellow"
                : "blue"
            }
          >
            {status}
          </Tag>
        </>
      ),
    },
    {
      title: "HIT reward",
      dataIndex: "reward",
      render: (reward) => (
        <>
          {`${reward ? reward : 0} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, hit) => {
        return (
          <>
            <Space size="middle">
              {hit.status === "working" ? (
                <Button
                  onClick={() => navigate(`/worker/accept/${hit.id}`)}
                  style={{
                    background: "var(--green)",
                    color: "white",
                    border: "none",
                    width: "70px",
                    height: "30px",
                    borderRadius: "5px",
                  }}
                >
                  Work
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(`/worker/accept/${hit.id}`)}
                  disabled={true}
                >
                  Work
                </Button>
              )}
            </Space>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getHITByWorker((res) => {
      if (res.data !== null) {
        setData(res.data);
      } else {
        message.error("Can not load the project list !");
      }
    });
    getStatic(user_id, (res) => {
      if (res.data !== null) {
        setDataS(res.data);
      }
    });
  }, []);
  console.log(dataS);
  return (
    <CRow>
      <CCol xs="10" md="9" className="mb-4">
        <CCard>
          <CCardBody
            style={{ fontSize: 15, fontWeight: "bold", color: "var(--green)" }}
          >
            HIT Status
          </CCardBody>
          <Table
            bordered
            className="overflow-auto"
            columns={columns}
            dataSource={data}
          />
          <CCardBody
            style={{
              color: "var(--green)",
              borderBottom: "2px solid rgba(0,0,0,0.5)",
              margin: 20,
            }}
          ></CCardBody>
          <CCardBody
            style={{ fontSize: 15, fontWeight: "bold", color: "var(--green)" }}
          >
            HITs Overview
          </CCardBody>
          <div
            style={{
              fontSize: 13,
              color: "rgba(0, 0, 0, 0.85)",
              border: "1px solid rgba(0, 0, 0, 0.09)",
              fontWeight: 500,
              paddingLeft: 50,
              paddingTop: 20,
              paddingBottom: 20,
              marginRight: "20%",
              marginTop: 20,
              marginLeft: "5%",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginRight: "30%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <p>Approved</p>
              <p>{dataS.approved}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginRight: "30%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <p>Approved Rate</p>
              <p>{dataS.approvedRate ? dataS.approvedRate : 0} %</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginRight: "30%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <p>Pending</p>
              <p>{dataS.pendingHIT}</p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginRight: "30%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <p>Rejected</p>
              <p>{dataS.rejected}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginRight: "30%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <p>Rejected Rate</p>
              <p>
                {dataS.approvedRate
                  ? (dataS.approvedRate = 100 - dataS.approvedRate)
                  : 0}
                %
              </p>
            </div>
          </div>
          <CCardBody
            style={{
              color: "var(--green)",
              borderBottom: "2px solid rgba(0,0,0,0.5)",
              margin: 20,
            }}
          ></CCardBody>
          <CCardBody
            style={{ fontSize: 15, fontWeight: "bold", color: "var(--green)" }}
          >
            Total Earnings to Date
          </CCardBody>
          <div
            style={{
              fontSize: 13,
              color: "rgba(0, 0, 0, 0.85)",
              border: "1px solid rgba(0, 0, 0, 0.09)",
              fontWeight: 500,
              paddingLeft: 50,
              paddingTop: 20,
              paddingBottom: 20,
              marginRight: "20%",
              marginTop: 20,
              marginLeft: "5%",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginRight: "30%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <p>Available money</p>
              <p>
                {`${dataS.availableEarn ? dataS.availableEarn : 0} VND`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                )}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
                marginRight: "30%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
              }}
            >
              <p>Total</p>
              <p>
                {`${dataS.totalEarn ? dataS.totalEarn : 0} VND`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                )}
              </p>
            </div>
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
