import React, { useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Table, Space, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllBatch, deleteBatchByID } from "../../../service/batch";
import { convertTime } from "../../../configs/convertTime";

const ProjectList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    defaultCurrent: 1,
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getAllBatch({}, {}, {}, (res) => {
      if (res.data !== null) {
        setData(res.data);
      } else {
        message.error("Can not load the project list !");
      }
    });
  }, []);

  const deleteProject = (id) => {
    Modal.confirm({
      title: `Delete project`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to delete this project? Are you sure you want to do this? You can't reverse this`,
      onOk() {
        deleteBatchByID(id, (res) => {
          if (res.data !== null) {
            message.success("Delete project successful !");
            window.location.reload();
          } else {
            message.error(res.error.message);
          }
        });
      },
      onCancel() {},
      centered: true,
    });
  };
  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      render: (projectName) => <>{projectName}</>,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (title) => <>{title}</>,
    },
    {
      title: "Update at",
      dataIndex: "updatedAt",
      render: (updatedAt) => <>{convertTime(updatedAt)}</>,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id) => {
        return (
          <>
            <Space size="middle">
              <button
                onClick={() => navigate(`/requester/publish/${id}`)}
                style={{
                  background: "var(--green)",
                  color: "white",
                  border: "none",
                  width: "70px",
                  height: "30px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Publish
              </button>
              <p
                onClick={() => navigate(`/project/detail/${id}`)}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Detail
              </p>
              <p
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => deleteProject(id)}
              >
                Delete
              </p>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <CRow>
      <CCol xs="12" md="10" style={{ marginTop: "20px" }}>
        <CCard>
          <CCardBody>
            <Table
              bordered
              className="overflow-auto"
              columns={columns}
              dataSource={data}
              pagination={pagination}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProjectList;
