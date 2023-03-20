import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Space, Table } from "antd";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Highlighter from "react";
import { useEffect } from "react";
import { applyHIT, getAllHit } from "../../../service/hit";
import { convertTime } from "../../../configs/convertTime";

const HITs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllHit({}, `filters[status][$eq]=available`, {}, (res) => {
      if (res.data !== null) {
        setData(res.data);
      } else {
        message.error(res.error.message);
      }
    });
  }, []);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleAcceptAndWork = (id) => {
    applyHIT(id, (res) => {
      if (res.data !== null) {
        message.success("Apply for HIT successfully !");
        navigate(`/worker/accept/${id}`);
      } else {
        message.error(res.error.message);
      }
    });
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
          color: "var(--green)",
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
            color: "var(--green)",
            borderColor: "var(--green)",
            boxShadow: "none",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              background: "var(--green)",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
            style={{
              color: "var(--green)",
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            style={{ color: "var(--green)" }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  let data3 = [];
  data.forEach((i) => {
    let tdata = {};
    tdata.id = i.id;

    tdata.projectName = i.batch.projectName;
    tdata.title = i.batch.title;
    tdata.reward = i.batch.reward ? i.batch.reward : 0;
    tdata.workable = i.batch.workable;

    tdata.createdAt = i.createdAt;
    data3.push(tdata);
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "7%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "id",
      width: "18%",
      ...getColumnSearchProps("projectName"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "id",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Reward",
      dataIndex: "reward",
      key: "id",
      width: "7%",
      ...getColumnSearchProps("reward"),
      render: (reward) => {
        return `${reward} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      sorter: (a, b) => a.reward - b.reward,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "id",
      width: "7%",
      ...getColumnSearchProps("creatat"),
      render: (createdAt) => {
        return <p>{convertTime(createdAt)}</p>;
      },
      sorter: (a, b) => a.creatat - b.creatat,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "15%",
      render: (id, hit) => {
        return (
          <>
            <Space
              size="middle"
              style={{ display: "flex", alignItems: "center" }}
            >
              {hit?.workable ? (
                <Button
                  onClick={() => {
                    handleAcceptAndWork(hit?.id);
                  }}
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
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleAcceptAndWork(hit?.id);
                  }}
                  disabled={true}
                >
                  Accept & Work
                </Button>
              )}

              <p
                onClick={() => navigate(`/worker/preview/${hit?.id}`)}
                className="preview"
                style={{
                  color: "var(--green)",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
              >
                {"Preview"}
              </p>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <Table
      style={{
        margin: 50,
        marginTop: 10,
      }}
      columns={columns}
      dataSource={data3}
    />
  );
};
export default HITs;
