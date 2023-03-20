import { Layout, Menu } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/auth";

import { useSelector } from "react-redux";

const { Header } = Layout;
const TheHeader = ({ allowedNav }) => {
  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = (index) => {
    if (allowedNav[index].name !== "Logout") {
      navigate(allowedNav[index].to);
    } else {
      dispatch(logout());
    }
  };
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div
        style={{ color: "var(--green)", fontWeight: "bold", fontSize: "24px" }}
      >
        UpToYOU
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={"0"}
        style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}
      >
        {allowedNav.map((nav, index) => {
            if(nav.name == 'WK_name')
            nav.name = user.username
          return (
            
            <Menu.Item
              key={index}
              onClick={() => {
                handleNavigation(index);
              }}
            >
              <span>{nav.name}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    </Header>
  );
};

export default TheHeader;
