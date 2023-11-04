import React from "react";
import { Layout, theme } from "antd";
import { Content, Footer, Header, Sider } from "~/layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";

function Main({}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="vh-100">
      <Sider style={{ background: colorBgContainer }} />
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/map" element={<Map />} />
        {/* <Route path="/kpi" element={<Kpi {...auth} />} /> */}
      </Routes>
    </Layout>
  );
}

export default Main;
