import React from "react";
import { Layout } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";

const { Content } = Layout;

const TheContent = ({ allowedRoute }) => {
  return (
    <Content className="site-layout">
      <div>
        <Routes>
          {allowedRoute.map((route, index) => {
            return (
              <Route
                path={route.path}
                exact
                element={<route.component />}
                key={index}
              />
            );
          })}
        </Routes>
      </div>
    </Content>
  );
};

export default TheContent;
