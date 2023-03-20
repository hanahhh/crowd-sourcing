import { Layout } from "antd";
import React from "react";
import TheContent from "../container/TheContent";
import TheHeader from "../container/TheHeader";
import nav from "../nav";
import routes from "../routes";
import { getAllowedNav, getAllowedRoute } from "../service/auth";
import { useSelector } from "react-redux";

const TheLayout = () => {
  const user = useSelector((state) => state.auth);
  let allowedNav, allowedRoute;
  if (user?.data?.role) {
    allowedRoute = getAllowedRoute(routes, user.data.role);
    allowedNav = getAllowedNav(nav, user.data.role);
  } else {
    window.location.href = "/login";
  }

  return (
    <Layout>
      <TheHeader allowedNav={allowedNav} />
      <Layout>
        <TheContent allowedRoute={allowedRoute} />
      </Layout>
    </Layout>
  );
};

export default TheLayout;
